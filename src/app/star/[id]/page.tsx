"use client";

import { use, useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { IMovieRepository } from "@/domain/repositories/movie-repository";
import type { Movie } from "@/domain/entities/movie";
import { getMovieStatusText, getMoviePlainDescription } from "@/domain/entities/movie";
import { MovieListTile } from "@/components/common/movie-list-tile";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";

interface Props {
  params: Promise<{ id: string }>;
}

export default function StarDetailPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const container = useContainer();
  const movieRepo = useMemo(() => container.get<IMovieRepository>(DI_KEYS.MovieRepository), [container]);

  const starName = searchParams.get("name") ?? "明星详情";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const pageRef = useRef(1);

  const loadMovies = useCallback(async (page: number) => {
    return movieRepo.getMoviesByActor({ actorId: id, page, pageSize: 20 });
  }, [movieRepo, id]);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const result = await loadMovies(1);
      result.fold(
        (err) => { setHasError(true); setErrorMessage(err.message); },
        (data) => {
          setMovies(data.items.slice());
          setHasMore(data.paginator.hasMorePages);
        },
      );
      setIsLoading(false);
    };
    init();
  }, [loadMovies]);

  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    const nextPage = pageRef.current + 1;
    const result = await loadMovies(nextPage);
    result.fold(
      () => {},
      (data) => {
        setMovies((prev) => [...prev, ...data.items]);
        setHasMore(data.paginator.hasMorePages);
        pageRef.current = nextPage;
      },
    );
    setIsLoadingMore(false);
  };

  const getMovieTags = (movie: Movie): string[] => {
    const tags: string[] = [];
    if (movie.year) tags.push(`${movie.year}`);
    if (movie.area) tags.push(movie.area);
    if (movie.genres) {
      for (const genre of movie.genres) {
        tags.push(genre.name);
      }
    }
    return tags;
  };

  return (
    <div className="flex h-screen flex-col bg-scaffold">
      {/* AppBar */}
      <div
        className="flex shrink-0 items-center justify-between pt-safe"
        style={{ borderBottom: "0.5px solid rgba(255,255,255,0.2)" }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center"
          style={{ height: 42, padding: "0 12px" }}
        >
          <ChevronLeft size={20} className="text-text-primary" />
          <span style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF", marginLeft: 4 }}>返回</span>
        </button>
        <span className="truncate" style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF", flex: 1, textAlign: "center" }}>
          {starName}
        </span>
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner text="加载中..." />
      ) : hasError ? (
        <ErrorState message={errorMessage || "加载失败"} onRetry={() => window.location.reload()} retryText="重试" />
      ) : movies.length === 0 ? (
        <EmptyState text="暂无影片" />
      ) : (
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: "12px 12px 0 12px" }}
          onScroll={(e) => {
            const el = e.currentTarget;
            if (el.scrollHeight - el.scrollTop - el.clientHeight < 200) {
              loadMore();
            }
          }}
        >
          {movies.map((movie) => {
            const tags = getMovieTags(movie);
            const statusText = getMovieStatusText(movie);
            const desc = getMoviePlainDescription(movie);
            return (
              <div key={movie.id} style={{ marginBottom: 16 }}>
                <MovieListTile
                  cover={movie.cover}
                  title={movie.title}
                  tags={tags.length > 0 ? tags : undefined}
                  statusText={statusText || undefined}
                  description={desc || undefined}
                  onTap={() => router.push(`/movie/${movie.id}`)}
                />
              </div>
            );
          })}
          {isLoadingMore && <LoadingSpinner />}
        </div>
      )}
    </div>
  );
}
