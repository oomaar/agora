import { type ReactNode } from "react";
import { type PostAudience } from "@/types/domain";
import { type MediaUpload } from "@/types/media";

export type Composer = {
  text: string;
  setText: (text: string) => void;
  audience: PostAudience;
  setAudience: (audience: PostAudience) => void;
  // Option texts while the poll is open, null without a poll.
  poll: string[] | null;
  setPoll: (poll: string[] | null) => void;
  media: MediaUpload;
  posting: boolean;
  error: string | null;
  // Resolves true once the post is published.
  submit: () => Promise<boolean>;
  clearError: () => void;
};

export type AudiencePickerProps = {
  value: PostAudience;
  onChange: (audience: PostAudience) => void;
  disabled?: boolean;
};

export type PollEditorProps = {
  options: string[];
  onChange: (options: string[] | null) => void;
  disabled?: boolean;
};

export type CharacterCounterProps = {
  length: number;
  max: number;
};

export type ComposeErrorProps = {
  message: string;
};

export type ComposerProviderProps = {
  children: ReactNode;
};

export type MediaAttachmentProps = {
  media: MediaUpload;
  disabled?: boolean;
};
