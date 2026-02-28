"use client";

import Link from "next/link";
import Image from "next/image";
import { OptimizedImage } from "@/components/common/optimized-image";
import type { Movie } from "@/domain/entities/movie";
import { getMovieStatusText, isMovieFHD } from "@/domain/entities/movie";
import clsx from "clsx";

interface Props {
  movie: Movie;
  width?: number;
  height?: number;
  className?: string;
  showScore?: boolean;
  showStatus?: boolean;
}

export function MovieCard({
  movie,
  width,
  height,
  className,
  showScore = true,
  showStatus = true,
}: Props) {
  const statusText = getMovieStatusText(movie);
  const fhd = isMovieFHD(movie);

  return (
    <Link href={`/movie/${movie.id}`} className={clsx("shrink-0", className)}>
      <div
        className="relative overflow-hidden"
        style={{
          width: width ?? "100%",
          aspectRatio: height && width ? `${width}/${height}` : "112/151",
          borderRadius: 6,
        }}
      >
        <OptimizedImage
          src={movie.cover}
          alt={movie.title}
          width={width ?? 112}
          height={height ?? 151}
          className="h-full w-full object-cover"
        />
        {/* Score badge */}
        {showScore && movie.score > 0 && (
          <span
            className="absolute"
            style={{
              top: 3,
              right: 3,
              fontSize: 10,
              fontWeight: 600,
              color: "#FFB800",
              textShadow: "0 1px 2px rgba(0,0,0,0.8)",
            }}
          >
            {movie.score.toFixed(1)}
          </span>
        )}
        {/* FHD badge */}
        {fhd && (
          <Image
            src="/images/fhd_badge.webp"
            alt="HD"
            width={24}
            height={14}
            className="absolute"
            style={{ top: 3, left: 3 }}
          />
        )}
        {/* Bottom gradient + status */}
        {showStatus && statusText && (
          <div
            className="absolute bottom-0 left-0 right-0 flex items-end px-1.5 pb-1"
            style={{
              height: 32,
              background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
              borderRadius: "0 0 6px 6px",
            }}
          >
            <span style={{ fontSize: 10, color: "#FFFFFF" }}>{statusText}</span>
          </div>
        )}
      </div>
      <p
        className="mt-1.5 truncate text-text-primary"
        style={{ fontSize: 12, lineHeight: 1 }}
      >
        {movie.title}
      </p>
    </Link>
  );
}
