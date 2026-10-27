import { type CommentView, type PostView } from "@/types/domain";

export type OwnedNoun = "post" | "comment";

// Edit and delete for something the signed-in user wrote.
export type OwnerActions = {
  noun: OwnedNoun;
  text: string;
  maxLength: number;
  saving: boolean;
  saveError: string | null;
  // Resolve true once the change is saved.
  save: (text: string) => Promise<boolean>;
  deleting: boolean;
  deleteError: string | null;
  remove: () => Promise<boolean>;
  resetErrors: () => void;
};

export type OwnerDialog = "edit" | "delete" | null;

export type OwnerMenuProps = {
  actions: OwnerActions;
};

export type EditTextModalProps = {
  open: boolean;
  title: string;
  label: string;
  initialText: string;
  maxLength: number;
  saving: boolean;
  error: string | null;
  onSave: (text: string) => void;
  onClose: () => void;
};

export type PostOwnerMenuProps = {
  post: PostView;
  onDeleted?: () => void;
};

export type CommentOwnerMenuProps = {
  comment: CommentView;
};
