import { type ButtonHTMLAttributes } from "react";
import { type IconName } from "@/types/icon";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "demo"
  | "danger"
  | "dangerOutline"
  | "follow"
  | "following";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: IconName;
};

export type FollowButtonProps = Omit<ButtonProps, "variant" | "children" | "onClick" | "onToggle"> & {
  following: boolean;
  onToggle: (following: boolean) => void;
};

export type IconButtonVariant = "ghost" | "outline" | "soft";

export type IconButtonSize = "sm" | "md" | "lg";

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: IconName;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
};

export type FilePickerButtonProps = Omit<ButtonProps, "onClick"> & {
  accept: string;
  onPick: (file: File) => void;
};
