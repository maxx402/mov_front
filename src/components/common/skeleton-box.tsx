import clsx from "clsx";

interface Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  rounded?: string;
}

export function SkeletonBox({
  className,
  width,
  height,
  rounded = "rounded-lg",
}: Props) {
  return (
    <div
      className={clsx("animate-shimmer", rounded, className)}
      style={{ width, height }}
    />
  );
}
