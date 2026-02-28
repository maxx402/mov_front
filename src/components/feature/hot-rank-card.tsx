"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { OptimizedImage } from "@/components/common/optimized-image";
import type { Movie } from "@/domain/entities/movie";
import { isMovieFHD, getMovieStatusText, getMovieViewCountText } from "@/domain/entities/movie";

interface Props {
  movies: readonly Movie[];
}

export function HotRankCard({ movies }: Props) {
  const router = useRouter();

  if (movies.length === 0) return null;

  return (
    <div className="relative w-full" style={{ height: 318 }}>
      {/* Background image */}
      <Image
        src="/images/hot_rank_card_bg.webp"
        alt=""
        width={375}
        height={236}
        className="absolute top-0 left-0 w-full object-cover"
        style={{ height: 236 }}
      />
      {/* Movie list - positioned at bottom */}
      <div
        className="scrollbar-none absolute bottom-0 left-0 right-0 flex overflow-x-auto"
        style={{ height: 238, paddingLeft: 12, paddingRight: 12, gap: 8 }}
      >
        {movies.slice(0, 10).map((movie, idx) => (
          <HotRankMovieCard key={movie.id} movie={movie} rank={idx + 1} />
        ))}
        {/* More button */}
        <button
          onClick={() => router.push("/rank")}
          className="flex shrink-0 flex-col items-center justify-center"
          style={{
            width: 60,
            height: 238,
            background: "rgba(255, 255, 255, 0.2)",
            border: "0.5px solid #B49769",
            borderRadius: 6,
          }}
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E4D5D1"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m10 8 4 4-4 4" />
          </svg>
          <span
            className="mt-2 text-center"
            style={{
              fontSize: 12,
              color: "#E4D5D1",
              lineHeight: 1.4,
            }}
          >
            {"查看\n完整榜单".split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </span>
        </button>
      </div>
    </div>
  );
}

function HotRankMovieCard({ movie, rank }: { movie: Movie; rank: number }) {
  const fhd = isMovieFHD(movie);
  const statusText = getMovieStatusText(movie);
  const viewText = getMovieViewCountText(movie);

  return (
    <Link href={`/movie/${movie.id}`} className="shrink-0" style={{ width: 160 }}>
      {/* Cover */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 160,
          height: 214,
          borderRadius: 6,
          border: "0.5px solid #B49769",
        }}
      >
        <OptimizedImage
          src={movie.cover}
          alt={movie.title}
          width={160}
          height={214}
          className="h-full w-full object-cover"
        />
        {/* FHD badge */}
        {fhd && (
          <Image
            src="/images/fhd_badge.webp"
            alt="FHD"
            width={28}
            height={16}
            className="absolute top-0 left-0"
          />
        )}
        {/* View count badge */}
        {viewText && (
          <div
            className="absolute flex items-center"
            style={{
              top: 3,
              right: 3,
              background: "rgba(35, 30, 29, 0.5)",
              borderRadius: 3,
              padding: "0 4px",
              height: 16,
            }}
          >
            <svg
              width={10}
              height={10}
              viewBox="0 0 24 24"
              fill="white"
              style={{ marginRight: 2 }}
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
            <span style={{ fontSize: 9, color: "#FFFFFF" }}>{viewText}</span>
          </div>
        )}
        {/* Rank badge */}
        {rank <= 10 && (
          <Image
            src={`/images/rank_${rank}.webp`}
            alt={`#${rank}`}
            width={40}
            height={80}
            className="absolute bottom-0 left-0"
            style={{ height: 80, width: "auto" }}
          />
        )}
        {/* Score + Status row */}
        <div
          className="absolute flex items-end"
          style={{ bottom: 8, right: 8, gap: 6 }}
        >
          {statusText && (
            <span style={{ fontSize: 12, color: "#E4D5D1" }}>
              {statusText}
            </span>
          )}
          {movie.score > 0 && (
            <span
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#FFFFFF",
              }}
            >
              {movie.score.toFixed(1)}
            </span>
          )}
        </div>
      </div>
      {/* Title */}
      <p
        className="mt-1.5 truncate"
        style={{ fontSize: 12, color: "#E4D5D1" }}
      >
        {movie.title}
      </p>
    </Link>
  );
}
