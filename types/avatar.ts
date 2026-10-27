export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export type AvatarProps = {
  name: string;
  handle: string;
  src?: string | null;
  size?: AvatarSize;
  className?: string;
};

export type AvatarSizeConfig = {
  px: number;
  className: string;
};
