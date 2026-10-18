export type SkeletonShape = "line" | "circle" | "block";

export type SkeletonProps = {
  shape?: SkeletonShape;
  className?: string;
};

export type PostSkeletonProps = {
  withMedia?: boolean;
  divider?: boolean;
  className?: string;
};
