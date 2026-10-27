"use client";

import { useEffect, useRef, useState } from "react";
import { useData } from "@/hooks/data/useData";
import { toDataError } from "@/services/dataError";
import { IDLE_UPLOAD, MEDIA_TYPES } from "@/lib/media/constants";
import { checkUpload } from "@/utils/checkUpload";
import { readMediaSize } from "@/utils/readMediaSize";
import {
  type ActiveUpload,
  type MediaUpload,
  type UploadedMedia,
  type UploadPurpose,
  type UploadState,
} from "@/types/media";

// One file at a time: picking another, clearing or unmounting cancels the upload in
// flight and frees its local preview. A file that fails the type or size check is
// never uploaded; a failed upload keeps the file so it can be retried.
export function useMediaUpload(purpose: UploadPurpose): MediaUpload {
  const { source } = useData();
  const [state, setState] = useState<UploadState>(IDLE_UPLOAD);
  const active = useRef<ActiveUpload | null>(null);

  function release() {
    if (!active.current) return;
    active.current.controller.abort();
    URL.revokeObjectURL(active.current.previewUrl);
    active.current = null;
  }

  useEffect(() => release, []);

  async function upload(
    file: File,
    previewUrl: string,
  ): Promise<UploadedMedia | null> {
    const controller = new AbortController();
    active.current = { controller, previewUrl };
    const isActive = () => active.current?.controller === controller;
    setState((state) => ({
      ...IDLE_UPLOAD,
      status: "uploading",
      file,
      kind: MEDIA_TYPES[file.type].kind,
      previewUrl,
      // A retry keeps the size already measured.
      size: state.previewUrl === previewUrl ? state.size : null,
    }));
    try {
      const media = await source.uploadMedia(file, purpose, {
        signal: controller.signal,
        onProgress: (progress) => {
          if (isActive()) setState((state) => ({ ...state, progress }));
        },
      });
      if (!isActive()) return null;
      setState((state) => ({
        ...state,
        status: "uploaded",
        progress: 100,
        url: media.url,
      }));
      return media;
    } catch (caught) {
      if (!isActive()) return null;
      const { message } = toDataError(caught);
      setState((state) => ({ ...state, status: "failed", error: message }));
      return null;
    }
  }

  return {
    status: state.status,
    kind: state.kind,
    previewUrl: state.previewUrl,
    size: state.size,
    progress: state.progress,
    url: state.url,
    error: state.error,
    start: (file) => {
      release();
      const problem = checkUpload(purpose, file.type, file.size);
      if (problem) {
        setState({ ...IDLE_UPLOAD, status: "failed", error: problem });
        return Promise.resolve(null);
      }
      const previewUrl = URL.createObjectURL(file);
      void readMediaSize(previewUrl, MEDIA_TYPES[file.type].kind).then(
        (size) => {
          if (active.current?.previewUrl === previewUrl) {
            setState((state) => ({ ...state, size }));
          }
        },
      );
      return upload(file, previewUrl);
    },
    // Keeps the file and its preview; only the request is replaced.
    retry: () => {
      const { file, previewUrl } = state;
      if (!file || !previewUrl) return Promise.resolve(null);
      active.current?.controller.abort();
      return upload(file, previewUrl);
    },
    clear: () => {
      release();
      setState(IDLE_UPLOAD);
    },
  };
}
