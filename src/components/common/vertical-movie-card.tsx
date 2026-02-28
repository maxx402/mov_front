"use client";

import { memo } from "react";
import Image from "next/image";
import { OptimizedImage } from "./optimized-image";

interface Props {
  readonly cover: string;
  readonly title: string;
  readonly width?: number;
  readonly height?: number;
  readonly showSelection?: boolean;
  readonly isSelected?: boolean;
  readonly onTap?: () => void;
}

export const VerticalMovieCard = memo(function VerticalMovieCard({
  cover,
  title,
  width = 112,
  height = 151,
  showSelection = false,
  isSelected = false,
  onTap,
}: Props) {
  return (
    <button onClick={onTap} className="flex flex-col" style={{ width }}>
      <div className="relative" style={{ width, height }}>
        <OptimizedImage
          src={cover}
          alt={title}
          width={width}
          height={height}
          rounded="rounded-[6px]"
        />

        {/* Selection overlay */}
        {showSelection && (
          <div className="absolute right-1.5 top-1.5">
            {isSelected ? (
              <Image
                src="/images/ic_checked.webp"
                alt=""
                width={22}
                height={22}
              />
            ) : (
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(255, 255, 255, 0.8)",
                  background: "rgba(0,0,0,0.3)",
                }}
              />
            )}
          </div>
        )}
      </div>

      <span
        className="mt-1.5 truncate self-stretch"
        style={{ fontSize: 12, color: "#FFFFFF", lineHeight: "16px" }}
      >
        {title}
      </span>
    </button>
  );
});
