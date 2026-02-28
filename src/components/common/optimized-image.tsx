"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  rounded?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  rounded = "rounded-lg",
  priority = false,
  fill = false,
  sizes,
  onClick,
  style,
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={clsx(
          "bg-card flex items-center justify-center",
          rounded,
          className,
        )}
        style={{ ...(fill ? undefined : { width, height }), ...style }}
        onClick={onClick}
      >
        <span className="text-text-tertiary text-xs">No Image</span>
      </div>
    );
  }

  return (
    <div
      className={clsx("relative overflow-hidden", rounded, className)}
      style={{ ...(fill ? undefined : { width, height }), ...style }}
      onClick={onClick}
    >
      {!isLoaded && (
        <div className="animate-shimmer absolute inset-0" />
      )}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={clsx(
          "object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          rounded,
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        unoptimized
      />
    </div>
  );
}
