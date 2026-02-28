"use client";

import type { Movie } from "@/domain/entities/movie";
import {
  getMovieDirectors,
  getMovieMainActors,
  getMoviePlainDescription,
  getMovieStatusText,
} from "@/domain/entities/movie";
import { OptimizedImage } from "@/components/common/optimized-image";

interface Props {
  movie: Movie;
}

export function IntroTabContent({ movie }: Props) {
  const directors = getMovieDirectors(movie);
  const actors = getMovieMainActors(movie);
  const description = getMoviePlainDescription(movie);
  const statusText = getMovieStatusText(movie);

  const tags: string[] = [];
  if (movie.year) tags.push(String(movie.year));
  if (movie.area) tags.push(movie.area);
  if (movie.genres) movie.genres.forEach((g) => tags.push(g.name));
  if (statusText) tags.push(statusText);

  return (
    <div>
      {/* 1. Cover + Basic Info */}
      <div
        className="flex"
        style={{ padding: "16px 11px 0 11px" }}
      >
        {/* Cover */}
        <OptimizedImage
          src={movie.cover}
          alt={movie.title}
          width={66}
          height={89}
          rounded="rounded-[5px]"
          style={{ width: 66, height: 89, flexShrink: 0 }}
        />

        {/* Info */}
        <div className="flex flex-1 items-start" style={{ marginLeft: 12 }}>
          <div className="flex-1">
            <h2
              className="line-clamp-2 font-bold text-white"
              style={{ fontSize: 18, lineHeight: "24px" }}
            >
              {movie.title}
            </h2>
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

      {/* 2. Directors */}
      {directors.length > 0 && (
        <div style={{ paddingTop: 20, paddingLeft: 12, paddingRight: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", lineHeight: "16px" }}>
            导演
          </span>
          <div className="flex flex-wrap" style={{ marginTop: 10, gap: "10px 5px" }}>
            {directors.map((d) => (
              <span
                key={d.actorId}
                style={{
                  height: 28,
                  display: "inline-flex",
                  alignItems: "center",
                  background: "rgba(38, 33, 34, 0.87)",
                  borderRadius: 4,
                  padding: "6px 10px",
                  fontSize: 13,
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                @{d.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 3. Actors */}
      {actors.length > 0 && (
        <div style={{ paddingTop: 16, paddingLeft: 12, paddingRight: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", lineHeight: "16px" }}>
            演员
          </span>
          <div className="flex flex-wrap" style={{ marginTop: 10, gap: "10px 5px" }}>
            {actors.map((a) => (
              <span
                key={a.actorId}
                style={{
                  height: 28,
                  display: "inline-flex",
                  alignItems: "center",
                  background: "rgba(38, 33, 34, 0.87)",
                  borderRadius: 4,
                  padding: "6px 10px",
                  fontSize: 13,
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                @{a.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 4. Plot */}
      <div style={{ paddingTop: 16, paddingLeft: 12, paddingRight: 12, paddingBottom: 20 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", lineHeight: "16px" }}>
          剧情
        </span>
        <p
          style={{
            marginTop: 10,
            fontSize: 13,
            lineHeight: "20px",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          {description || "暂无简介"}
        </p>
      </div>
    </div>
  );
}
