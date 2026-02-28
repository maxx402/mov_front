"use client";

import { use, useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { IMovieRepository } from "@/domain/repositories/movie-repository";
import type { Movie } from "@/domain/entities/movie";
import { OptimizedImage } from "@/components/common/optimized-image";
import { ChannelMovieCard } from "@/components/common/channel-movie-card";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";

interface Props {
  params: Promise<{ id: string }>;
}

export default function TopicDetailPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const container = useContainer();
  const movieRepo = useMemo(() => container.get<IMovieRepository>(DI_KEYS.MovieRepository), [container]);

  const topicName = searchParams.get("name") ?? "";
  const topicCover = searchParams.get("cover") ?? "";
  const groupName = searchParams.get("groupName") ?? "";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const pageRef = useRef(1);
  const [scrollOffset, setScrollOffset] = useState(0);

  const loadMovies = useCallback(async (page: number) => {
    return movieRepo.getMoviesByTopic({ topicId: id, page, pageSize: 20 });
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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setScrollOffset(el.scrollTop);
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 200) {
      loadMore();
    }
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
        {groupName && (
          <span className="truncate" style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF", flex: 1, textAlign: "center" }}>
            {groupName}
          </span>
        )}
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner text="加载中..." />
      ) : hasError ? (
        <ErrorState message={errorMessage || "加载失败"} onRetry={() => window.location.reload()} retryText="重试" />
      ) : (
        <div className="relative flex-1 overflow-hidden">
          {/* Parallax cover */}
          {topicCover && (
            <div
              className="absolute inset-x-0 top-0"
              style={{ transform: `translateY(${-scrollOffset}px)` }}
            >
              <div className="relative" style={{ width: "100%", height: 220 }}>
                <OptimizedImage
                  src={topicCover}
                  alt={topicName}
                  width={375}
                  height={220}
                  rounded="rounded-[5px]"
                  fill
                  sizes="100vw"
                />
                <div
                  className="absolute inset-x-0 bottom-0"
                  style={{
                    height: 70,
                    background: "linear-gradient(to bottom, transparent, #1A1A1A)",
                  }}
                />
              </div>
            </div>
          )}

          {/* Scrollable content */}
          <div className="h-full overflow-y-auto" onScroll={handleScroll}>
            {topicCover && <div style={{ height: 126 }} />}

            {/* Title */}
            <div style={{ padding: "0 12px" }}>
              {topicName && (
                <h1 style={{
                  fontSize: 18, fontWeight: 500, color: "#FFFFFF",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.15)",
                }}>
                  {topicName}
                </h1>
              )}
            </div>

            <div style={{ height: 26 }} />

            {/* Movie grid */}
            {movies.length === 0 ? (
              <EmptyState text="暂无影片" />
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 10,
                  padding: "0 12px",
                  paddingBottom: 30,
                }}
              >
                {movies.map((movie) => (
                  <ChannelMovieCard
                    key={movie.id}
                    movie={movie}
                    onTap={() => router.push(`/movie/${movie.id}`)}
                  />
                ))}
              </div>
            )}

            {isLoadingMore && <LoadingSpinner />}
          </div>
        </div>
      )}
    </div>
  );
}
