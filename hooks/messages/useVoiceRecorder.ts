"use client";

import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  LIVE_LEVEL_BARS,
  VOICE_ERRORS,
  VOICE_LEVEL_SAMPLE_MS,
  VOICE_NOTE_MIN_MS,
} from "@/lib/messages/constants";
import {
  MEDIA_LABELS,
  MEDIA_TYPES,
  VOICE_NOTE_MAX_MS,
  WAVEFORM_BARS,
} from "@/lib/media/constants";
import { createTempId } from "@/utils/createTempId";
import { downsampleLevels } from "@/utils/downsampleLevels";
import { endRecording } from "@/utils/endRecording";
import { pickRecorderType } from "@/utils/pickRecorderType";
import { readLevel } from "@/utils/readLevel";
import { type OutgoingAttachment } from "@/types/domain";
import {
  type RecordingSession,
  type VoiceRecorderStatus,
} from "@/types/messages";

const subscribeNever = () => () => {};

function canRecord(): boolean {
  return (
    typeof MediaRecorder !== "undefined" &&
    typeof navigator.mediaDevices?.getUserMedia === "function"
  );
}

// Records a voice note from the microphone, sampling its loudness for live bars
// and the waveform. Cancelling or unmounting throws the audio away.
export function useVoiceRecorder(onLimit: () => void) {
  const supported = useSyncExternalStore(
    subscribeNever,
    canRecord,
    () => false,
  );
  const [status, setStatus] = useState<VoiceRecorderStatus>("idle");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [levels, setLevels] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const session = useRef<RecordingSession | null>(null);
  // Bumped by every start, cancel and unmount, so a start still waiting for the
  // microphone knows it's been abandoned.
  const attempts = useRef(0);
  const reachLimit = useEffectEvent(onLimit);

  function release(keepAudio = false) {
    attempts.current += 1;
    setStatus("idle");
    const current = session.current;
    if (!current) return;
    session.current = null;
    endRecording(current, keepAudio);
    setElapsedMs(0);
    setLevels([]);
  }

  // Recording stops at the length limit; `onLimit` decides what happens next.
  useEffect(() => {
    if (status === "recording" && elapsedMs >= VOICE_NOTE_MAX_MS) reachLimit();
  }, [status, elapsedMs]);

  useEffect(() => {
    const active = session;
    const counter = attempts;
    return () => {
      counter.current += 1;
      if (active.current) endRecording(active.current);
      active.current = null;
    };
  }, []);

  async function start() {
    if (session.current || status !== "idle") return;
    const attempt = ++attempts.current;
    setError(null);
    setStatus("starting");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      if (attempt !== attempts.current) return;
      setStatus("idle");
      setError(VOICE_ERRORS.permission);
      return;
    }
    // Discarded (or unmounted) while the microphone was opening.
    if (attempt !== attempts.current) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }
    let context: AudioContext | null = null;
    try {
      const type = pickRecorderType();
      const recorder = new MediaRecorder(
        stream,
        type ? { mimeType: type } : undefined,
      );
      const chunks: Blob[] = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data);
      };
      context = new AudioContext();
      const analyser = context.createAnalyser();
      analyser.fftSize = 1024;
      context.createMediaStreamSource(stream).connect(analyser);
      const buffer = new Uint8Array(analyser.fftSize);
      const samples: number[] = [];
      recorder.start();
      const startedAt = performance.now();
      const timer = setInterval(() => {
        analyser.getByteTimeDomainData(buffer);
        samples.push(readLevel(buffer));
        setLevels(samples.slice(-LIVE_LEVEL_BARS));
        setElapsedMs(performance.now() - startedAt);
      }, VOICE_LEVEL_SAMPLE_MS);
      session.current = {
        stream,
        recorder,
        chunks,
        context,
        timer,
        samples,
        startedAt,
      };
      setStatus("recording");
    } catch {
      stream.getTracks().forEach((track) => track.stop());
      void context?.close();
      setStatus("idle");
      setError(VOICE_ERRORS.failed);
    }
  }

  // Stops and returns the voice note, ready to send (null if it was too short or failed).
  async function stop(): Promise<OutgoingAttachment | null> {
    const current = session.current;
    if (!current) return null;
    const durationMs = Math.min(
      VOICE_NOTE_MAX_MS,
      Math.round(performance.now() - current.startedAt),
    );
    const { recorder, chunks, samples } = current;
    const recorded = new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
    });
    recorder.stop();
    release(true);
    await recorded;
    if (durationMs < VOICE_NOTE_MIN_MS) {
      setError(VOICE_ERRORS.tooShort);
      return null;
    }
    // "audio/webm;codecs=opus" → "audio/webm".
    const contentType = recorder.mimeType.split(";")[0].trim();
    const type = MEDIA_TYPES[contentType];
    if (!type || !chunks.length) {
      setError(VOICE_ERRORS.failed);
      return null;
    }
    const file = new File(chunks, `${MEDIA_LABELS.audio}.${type.extension}`, {
      type: contentType,
    });
    return {
      id: createTempId(),
      file,
      kind: "audio",
      previewUrl: URL.createObjectURL(file),
      url: "",
      name: MEDIA_LABELS.audio,
      size: file.size,
      durationMs,
      waveform: downsampleLevels(samples, WAVEFORM_BARS),
    };
  }

  return {
    supported,
    status,
    elapsedMs,
    levels,
    error,
    start: () => void start(),
    stop,
    cancel: () => release(),
    dismissError: () => setError(null),
  };
}
