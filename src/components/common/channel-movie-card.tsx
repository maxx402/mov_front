"use client";

import { OptimizedImage } from "./optimized-image";
import { getMovieStatusText } from "@/domain/entities/movie";
import type { Movie } from "@/domain/entities/movie";

interface Props {
  readonly movie: Movie;
  readonly width?: number;
  readonly onTap?: () => void;
}

export function ChannelMovieCard({
  movie,
  width = 108,
  onTap,
}: Props) {
  const height = Math.round(width * 1.4);
  const statusText = getMovieStatusText(movie);

  return (
    <button onClick={onTap} className="flex flex-col" style={{ width }}>
      <div className="relative" style={{ width, height }}>
        <OptimizedImage
          src={movie.cover}
          alt={movie.title}
          width={width}
          height={height}
          rounded="rounded-[6px]"
        />

        {/* Status text (bottom-right) */}
        {statusText && (
          <div
            className="absolute bottom-1 right-1 flex items-center justify-center"
            style={{
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

        {/* Score (top-right) */}
        {movie.score > 0 && (
          <div className="absolute right-1 top-1">
            <span style={{ fontSize: 10, fontWeight: 700, color: "#FFE5B4", lineHeight: "12px" }}>
              {movie.score.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <span
        className="mt-1.5 truncate self-stretch"
        style={{ fontSize: 12, color: "#FFFFFF", lineHeight: "16px" }}
      >
        {movie.title}
      </span>
    </button>
  );
}
