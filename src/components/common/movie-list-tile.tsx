"use client";

import Image from "next/image";
import { OptimizedImage } from "./optimized-image";

interface Props {
  readonly cover: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly extraInfo?: string;
  readonly description?: string;
  readonly tags?: readonly string[];
  readonly statusText?: string;
  readonly statusTag?: string;
  readonly rank?: number;
  readonly coverWidth?: number;
  readonly coverHeight?: number;
  readonly coverRadius?: number;
  readonly spacing?: number;
  readonly isSelected?: boolean;
  readonly showSelection?: boolean;
  readonly onTap?: () => void;
}

export function MovieListTile({
  cover,
  title,
  subtitle,
  extraInfo,
  description,
  tags,
  statusText,
  statusTag,
  rank,
  coverWidth = 100,
  coverHeight = 135,
  coverRadius = 6,
  spacing = 12,
  isSelected = false,
  showSelection = false,
  onTap,
}: Props) {
  return (
    <button
      onClick={onTap}
      className="flex w-full items-center text-left"
      style={{ gap: spacing }}
    >
      {/* Selection indicator */}
      {showSelection && (
        <div className="shrink-0" style={{ marginRight: 10 }}>
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
              }}
            />
          )}
        </div>
      )}

      {/* Cover with rank badge and status */}
      <div className="relative shrink-0" style={{ width: coverWidth, height: coverHeight }}>
        <OptimizedImage
          src={cover}
          alt={title}
          width={coverWidth}
          height={coverHeight}
          rounded={`rounded-[${coverRadius}px]`}
        />

        {/* Bottom gradient (for rank or statusText) */}
        {(rank != null || statusText) && (
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: 50,
              borderBottomLeftRadius: coverRadius,
              borderBottomRightRadius: coverRadius,
              background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
            }}
          />
        )}

        {/* Status text (top-right) */}
        {statusText && (
          <div
            className="absolute flex items-center justify-center"
            style={{
              right: 3,
              top: 3,
              height: 14,
              paddingLeft: 4,
              paddingRight: 4,
              borderRadius: 4,
              background: "rgba(35, 30, 29, 0.5)",
            }}
          >
            <span style={{ fontSize: 10, color: "#FFFFFF", lineHeight: "12px" }}>
              {statusText}
            </span>
          </div>
        )}

        {/* Rank badge (bottom-left) */}
        {rank != null && <RankBadge rank={rank} />}
      </div>

      {/* Right info */}
      <div
        className="flex min-w-0 flex-1 flex-col"
        style={{
          height: coverHeight,
          justifyContent: description ? "space-between" : "flex-start",
        }}
      >
        <div className="flex flex-col">
          {/* Title */}
          <span
            className="truncate"
            style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF", lineHeight: "20px" }}
          >
            {title}
          </span>

          {/* Subtitle */}
          {subtitle && (
            <span
              className="mt-1.5 truncate"
              style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: "16px" }}
            >
              {subtitle}
            </span>
          )}

          {/* Extra info */}
          {extraInfo && (
            <span
              className="mt-1.5 truncate"
              style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: "16px" }}
            >
              {extraInfo}
            </span>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mt-1.5 flex flex-wrap" style={{ gap: 5 }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center justify-center"
                  style={{
                    height: 24,
                    paddingLeft: 12,
                    paddingRight: 12,
                    borderRadius: 12,
                    background: "rgba(38, 33, 34, 0.53)",
                    border: "0.5px solid #363636",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: "1",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Status tag (pill) */}
          {statusTag && (
            <div
              className="mt-4 self-start"
              style={{
                paddingLeft: 14.5,
                paddingRight: 14.5,
                paddingTop: 7,
                paddingBottom: 7,
                borderRadius: 13,
                background: "rgba(38, 33, 34, 0.53)",
                border: "0.5px solid #363636",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.8)", lineHeight: "1" }}>
                {statusTag}
              </span>
            </div>
          )}
        </div>

        {/* Description (bottom) */}
        {description && (
          <p
            className="line-clamp-2"
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
              lineHeight: "20px",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </button>
  );
}

/* RankBadge: top 10 use images, >10 use text */
export function RankBadge({ rank }: { readonly rank: number }) {
  if (rank >= 1 && rank <= 10) {
    return (
      <div className="absolute bottom-0.5 left-0.5">
        <Image
          src={`/images/rank_${rank}.webp`}
          alt={`#${rank}`}
          width={24}
          height={66}
          style={{ height: 66, width: "auto", objectFit: "contain" }}
        />
      </div>
    );
  }

  return (
    <div className="absolute bottom-1 left-1.5">
      <span
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: "#FFFFFF",
          lineHeight: "1",
          textShadow: "1px 1px 4px #000, 0 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        {rank}
      </span>
    </div>
  );
}
