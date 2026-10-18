export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export type AvatarProps = {
  name: string;
  handle: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
};

export type AvatarSizeConfig = {
  px: number;
  className: string;
};
