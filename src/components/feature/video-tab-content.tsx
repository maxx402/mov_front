"use client";

import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Movie } from "@/domain/entities/movie";
import { getMovieStatusText } from "@/domain/entities/movie";
import type { Episode } from "@/domain/entities/episode";
import { getEpisodeDisplayTitle } from "@/domain/entities/episode";
import { OptimizedImage } from "@/components/common/optimized-image";
import { NoticeBar } from "@/components/feature/notice-bar";

interface Props {
  movie: Movie;
  episodes: readonly Episode[];
  currentEpisodeId?: string;
  onEpisodeSelect: (episode: Episode) => void;
  recommendedMovies: readonly Movie[];
  onRefreshRecommended?: () => void;
  onShowAllEpisodes?: () => void;
  marqueeTexts?: readonly string[];
}

export const VideoTabContent = observer(function VideoTabContent({
  movie,
  episodes,
  currentEpisodeId,
  onEpisodeSelect,
  recommendedMovies,
  onRefreshRecommended,
  onShowAllEpisodes,
  marqueeTexts,
}: Props) {
  const statusText = getMovieStatusText(movie);
  const tags: string[] = [];
  if (movie.year) tags.push(String(movie.year));
  if (movie.area) tags.push(movie.area);
  if (movie.genres) movie.genres.forEach((g) => tags.push(g.name));
  if (statusText) tags.push(statusText);

  const episodeCountText = movie.totalEpisodes > 0
    ? movie.status === 2
      ? `全${movie.totalEpisodes}集`
      : `更${movie.currentEpisode}集`
    : "";

  return (
    <div>
      {/* 1. Title + Tags + Score */}
      <div style={{ padding: "12px 11px 0 11px" }}>
        <div className="flex items-start">
          <div className="flex-1" style={{ maxWidth: "calc(100% - 70px)" }}>
            {/* Title */}
            <h2
              className="line-clamp-2 font-bold text-white"
              style={{ fontSize: 18, lineHeight: "24px" }}
            >
              {movie.title}
            </h2>
            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap" style={{ gap: 8 }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(38, 33, 34, 0.87)",
                      border: "0.5px solid #363636",
                      borderRadius: 12,
                      padding: "3px 8px",
                      fontSize: 10,
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Score */}
          {movie.score > 0 && (
            <span
              className="shrink-0"
              style={{
                fontSize: 36,
                fontWeight: 500,
                color: "#E4D5D1",
                lineHeight: 1,
                marginLeft: 8,
              }}
            >
              {movie.score.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      {/* 2. Episodes */}
      {episodes.length > 0 && (
        <div style={{ marginTop: 20 }}>
          {/* Episode header */}
          <button
            className="flex w-full items-center"
            style={{ padding: "0 11px", marginBottom: 14 }}
            onClick={onShowAllEpisodes}
          >
            <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF" }}>
              选集
            </span>
            <span className="flex-1" />
            {episodeCountText && (
              <span
                style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.7)" }}
              >
                {episodeCountText}
              </span>
            )}
            <ChevronRight size={16} color="rgba(255, 255, 255, 0.7)" />
          </button>
          {/* Horizontal scrolling episodes */}
          <div
            className="scrollbar-none flex overflow-x-auto"
            style={{ gap: 8, paddingLeft: 11, paddingRight: 11 }}
          >
            {episodes.map((ep) => {
              const isSelected = ep.id === currentEpisodeId;
              return (
                <button
                  key={ep.id}
                  onClick={() => onEpisodeSelect(ep)}
                  className="shrink-0"
                  style={{
                    height: 32,
                    borderRadius: isSelected ? 4 : 4,
                    padding: isSelected ? "0 23px" : "0 12px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.8)",
                    background: isSelected ? undefined : "rgba(255, 255, 255, 0.08)",
                    backgroundImage: isSelected ? "url(/images/ic_episode_btn.webp)" : undefined,
                    backgroundSize: isSelected ? "cover" : undefined,
                    backgroundPosition: isSelected ? "center" : undefined,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {getEpisodeDisplayTitle(ep)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Notice bar */}
      {marqueeTexts && marqueeTexts.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <NoticeBar texts={marqueeTexts} />
        </div>
      )}

      {/* 4. 猜你喜欢 */}
      {recommendedMovies.length > 0 && (
        <div style={{ marginTop: 16, paddingBottom: 16 }}>
          {/* Header */}
          <div
            className="flex items-center"
            style={{ padding: "0 11px", marginBottom: 12 }}
          >
            <Image
              src="/images/ic_guess_like_badge.webp"
              alt=""
              width={20}
              height={20}
            />
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#FFFFFF",
                marginLeft: 6,
              }}
            >
              猜你喜欢
            </span>
            <span className="flex-1" />
            {onRefreshRecommended && (
              <button
                onClick={onRefreshRecommended}
                className="flex items-center"
                style={{ gap: 4 }}
              >
                <Image
                  src="/images/ic_refresh.webp"
                  alt=""
                  width={14}
                  height={14}
                />
                <span style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.7)" }}>
                  换一批
                </span>
              </button>
            )}
          </div>
          {/* Horizontal scroll */}
          <div
            className="scrollbar-none flex overflow-x-auto"
            style={{ gap: 8, paddingLeft: 11, paddingRight: 11 }}
          >
            {recommendedMovies.map((m) => (
              <Link
                key={m.id}
                href={`/movie/${m.id}`}
                className="shrink-0"
                style={{ width: 108 }}
              >
                <OptimizedImage
                  src={m.cover}
                  alt={m.title}
                  width={108}
                  height={150}
                  rounded="rounded-[5px]"
                  className="w-full"
                  style={{ aspectRatio: "108/150" }}
                />
                <p
                  className="mt-1.5 truncate"
                  style={{ fontSize: 12, color: "#FFFFFF" }}
                >
                  {m.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
