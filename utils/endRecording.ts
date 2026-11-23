import { type RecordingSession } from "@/types/messages";

// Stops sampling, releases the microphone and closes the audio graph. The
// recorder is stopped too unless it's being stopped to keep the audio.
export function endRecording(
  session: RecordingSession,
  keepAudio = false,
): void {
  if (!keepAudio && session.recorder.state === "recording")
    session.recorder.stop();
  clearInterval(session.timer);
  session.stream.getTracks().forEach((track) => track.stop());
  void session.context.close();
}
