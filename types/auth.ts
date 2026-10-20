import { type ReactNode } from "react";

// The signed-in user, read from the Better Auth session on the server.
export type Session = {
  userId: string;
  email: string;
  name: string;
  handle: string;
};

// What Better Auth hands the sign-up hook: the core user fields plus whatever the form sent.
export type NewAuthUser = {
  name: string;
  email: string;
} & Record<string, unknown>;

// The error a Better Auth client call resolves with.
export type AuthClientError = {
  status: number;
  code?: string;
  message?: string;
};

export type SignInDetails = {
  email: string;
  password: string;
};

export type SignUpDetails = {
  name: string;
  handle: string;
  email: string;
  password: string;
};

export type SignInField = keyof SignInDetails;

export type SignUpField = keyof SignUpDetails;

export type FieldErrors<TField extends string> = Partial<
  Record<TField, string>
>;

export type AuthFormOptions<TField extends string, TDetails> = {
  validate: (details: TDetails) => FieldErrors<TField>;
  request: (details: TDetails) => Promise<void>;
};

export type AuthFormResult<TField extends string, TDetails> = {
  pending: boolean;
  fieldErrors: FieldErrors<TField>;
  formError: string | null;
  submit: (details: TDetails) => void;
};

export type GoogleSignInResult = {
  pending: boolean;
  error: string | null;
  start: () => void;
};

export type AuthContextValue = {
  session: Session;
  signOut: () => Promise<void>;
};

export type AuthProviderProps = {
  session: Session;
  children: ReactNode;
};

export type FormErrorProps = {
  message: string | null;
};

export type SignInFormProps = {
  // Shown when Google sign-in sent the visitor back with an error.
  oauthError: string | null;
};

export type GoogleButtonProps = {
  initialError?: string | null;
};
