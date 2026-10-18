export type LogoSize = "sm" | "md" | "lg";

export type LogoMarkProps = {
  size: number;
  strokeWidth?: number;
  className?: string;
};

export type LogoProps = {
  size?: LogoSize;
  showWordmark?: boolean;
  className?: string;
};

export type AppIconProps = {
  className?: string;
};

export type LogoSizeConfig = {
  mark: number;
  wordmarkClassName: string;
  gapClassName: string;
};
