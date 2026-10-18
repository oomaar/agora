import { type SVGProps } from "react";

export type IconName =
  | "home"
  | "search"
  | "bell"
  | "mail"
  | "user"
  | "settings"
  | "comment"
  | "repost"
  | "heart"
  | "share"
  | "plus"
  | "close"
  | "arrowLeft"
  | "chevronDown"
  | "more"
  | "image"
  | "video"
  | "poll"
  | "check"
  | "alert"
  | "play";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number;
  filled?: boolean;
  title?: string;
};
