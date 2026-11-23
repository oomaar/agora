"use client";

import { type SyntheticEvent, useRef, useState } from "react";

type AudioEvent = SyntheticEvent<HTMLAudioElement>;

// Plays one voice note through a hidden <audio>. The length comes from the
// message when the browser recorded it (recorded WebM files often report an
// unknown duration); otherwise from the file. Starting one pauses any other.
export function useVoicePlayer(durationMs: number | undefined) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentMs, setCurrentMs] = useState(0);
  const [fileDurationMs, setFileDurationMs] = useState<number | null>(null);
  const totalMs = durationMs ?? fileDurationMs ?? 0;

  return {
    ref,
    playing,
    currentMs,
    totalMs,
    toggle: () => {
      const audio = ref.current;
      if (!audio) return;
      if (audio.paused) void audio.play().catch(() => setPlaying(false));
      else audio.pause();
    },
    seek: (ms: number) => {
      const audio = ref.current;
      if (!audio) return;
      audio.currentTime = ms / 1000;
      setCurrentMs(ms);
    },
    audioProps: {
      onPlay: (event: AudioEvent) => {
        const audio = event.currentTarget;
        document.querySelectorAll("audio").forEach((other) => {
          if (other !== audio) other.pause();
        });
        setPlaying(true);
      },
      onPause: () => setPlaying(false),
      onEnded: () => {
        setPlaying(false);
        setCurrentMs(0);
      },
      onTimeUpdate: (event: AudioEvent) => {
        const audio = event.currentTarget;
        if (!audio.ended) setCurrentMs(audio.currentTime * 1000);
      },
      onLoadedMetadata: (event: AudioEvent) => {
        const { duration } = event.currentTarget;
        if (duration && Number.isFinite(duration)) {
          setFileDurationMs(duration * 1000);
        }
      },
    },
  };
}
