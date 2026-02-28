"use client";

import Link from "next/link";
import { OptimizedImage } from "@/components/common/optimized-image";
import type { Movie } from "@/domain/entities/movie";
import { getMovieStatusText } from "@/domain/entities/movie";
import clsx from "clsx";

interface Props {
  movie: Movie;
  width?: number;
  className?: string;
}

export function HorizontalMovieCard({
  movie,
  width = 160,
  className,
}: Props) {
  const height = Math.round(width * 9 / 16);
  const statusText = getMovieStatusText(movie);

  return (
    <Link href={`/movie/${movie.id}`} className={clsx("shrink-0", className)}>
      <div className="relative" style={{ width, height, borderRadius: 5, overflow: "hidden" }}>
        <OptimizedImage
          src={movie.cover}
          alt={movie.title}
          width={width}
          height={height}
          rounded="rounded-[5px]"
          className="h-full w-full"
        />
        {statusText && (
          <span
            className="absolute"
            style={{
              bottom: 4,
              right: 4,
              background: "rgba(0, 0, 0, 0.6)",
              borderRadius: 3,
              padding: "2px 6px",
              fontSize: 10,
              color: "#FFFFFF",
            }}
          >
            {statusText}
          </span>
        )}
        {movie.score > 0 && (
          <span
            className="absolute"
            style={{
              top: 4,
              right: 4,
              background: "rgba(0, 0, 0, 0.6)",
              borderRadius: 3,
              padding: "2px 6px",
              fontSize: 10,
              color: "#FFB800",
              fontWeight: 600,
            }}
          >
            {movie.score.toFixed(1)}
          </span>
        )}
      </div>
      <p className="mt-1.5 line-clamp-1 text-xs text-text-primary" style={{ width }}>
        {movie.title}
      </p>
    </Link>
  );
}
