import { type ReactNode } from "react";

// What the session cookie carries; the app seeds the signed-in user from it.
export type Session = {
  email: string;
  name: string;
  handle: string;
};

// A simulated account, stored only in this browser.
export type Account = Session & {
  password: string;
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
  request: (details: TDetails) => Promise<Session>;
};

export type AuthFormResult<TField extends string, TDetails> = {
  pending: boolean;
  fieldErrors: FieldErrors<TField>;
  formError: string | null;
  submit: (details: TDetails) => void;
};

export type AuthContextValue = {
  session: Session;
  signOut: () => void;
};

export type AuthProviderProps = {
  session: Session;
  children: ReactNode;
};

export type FormErrorProps = {
  message: string | null;
};
