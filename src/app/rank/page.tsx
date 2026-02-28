"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { ICategoryRepository } from "@/domain/repositories/category-repository";
import type { IMovieRepository } from "@/domain/repositories/movie-repository";
import type { Category } from "@/domain/entities/category";
import type { Movie } from "@/domain/entities/movie";
import { getMovieStatusText, getMoviePlainDescription } from "@/domain/entities/movie";
import { MovieListTile } from "@/components/common/movie-list-tile";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";

interface CategoryPageData {
  readonly movies: Movie[];
  readonly hasMore: boolean;
  readonly page: number;
  readonly isLoading: boolean;
  readonly isInitialized: boolean;
}

export default function RankPage() {
  const router = useRouter();
  const container = useContainer();
  const categoryRepo = useMemo(() => container.get<ICategoryRepository>(DI_KEYS.CategoryRepository), [container]);
  const movieRepo = useMemo(() => container.get<IMovieRepository>(DI_KEYS.MovieRepository), [container]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Per-category data cache
  const [pageData, setPageData] = useState<Record<string, CategoryPageData>>({});

  useEffect(() => {
    const load = async () => {
      const result = await categoryRepo.getCategories();
      result.fold(
        () => { setHasError(true); },
        (data) => {
          setCategories(data);
          if (data.length > 0) {
            loadCategoryMovies(data[0].id, 1);
          }
        },
      );
      setIsLoadingCategories(false);
    };
    load();
  }, [categoryRepo]);

  const loadCategoryMovies = useCallback(async (categoryId: string, page: number) => {
    setPageData((prev) => ({
      ...prev,
      [categoryId]: {
        ...(prev[categoryId] ?? { movies: [], hasMore: false, page: 1, isLoading: false, isInitialized: false }),
        isLoading: true,
      },
    }));

    const result = await movieRepo.getHotRankMovies({ categoryId, page, pageSize: 20 });
    result.fold(
      () => {
        setPageData((prev) => ({
          ...prev,
          [categoryId]: { ...(prev[categoryId] ?? { movies: [], hasMore: false, page: 1, isLoading: false, isInitialized: false }), isLoading: false, isInitialized: true },
        }));
      },
      (data) => {
        setPageData((prev) => {
          const existing = prev[categoryId];
          const newMovies = page === 1 ? data.items.slice() : [...(existing?.movies ?? []), ...data.items];
          return {
            ...prev,
            [categoryId]: {
              movies: newMovies,
              hasMore: data.paginator.hasMorePages,
              page,
              isLoading: false,
              isInitialized: true,
            },
          };
        });
      },
    );
  }, [movieRepo]);

  const handleCategorySelect = (index: number) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
    const catId = categories[index].id;
    if (!pageData[catId]?.isInitialized) {
      loadCategoryMovies(catId, 1);
    }
  };

  const handleLoadMore = () => {
    if (categories.length === 0) return;
    const catId = categories[selectedIndex].id;
    const data = pageData[catId];
    if (!data || data.isLoading || !data.hasMore) return;
    loadCategoryMovies(catId, data.page + 1);
  };

  const currentCatId = categories.length > 0 ? categories[selectedIndex].id : "";
  const currentData = pageData[currentCatId];

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
        className="flex shrink-0 items-center pt-safe"
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
        <span className="flex-1 text-center" style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF" }}>
          热播排行榜
        </span>
        <div style={{ width: 60 }} />
      </div>

      {isLoadingCategories ? (
        <LoadingSpinner text="加载中..." />
      ) : hasError ? (
        <ErrorState message="加载失败" onRetry={() => window.location.reload()} retryText="重试" />
      ) : categories.length === 0 ? (
        <EmptyState text="暂无数据" />
      ) : (
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header cover */}
          <div className="relative shrink-0" style={{ width: "100%", height: 114 }}>
            <Image
              src="/images/hot_rank_detail_card_bg.webp"
              alt=""
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              unoptimized
            />
            <div className="absolute inset-x-0 flex items-center justify-center" style={{ top: 66 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF", lineHeight: "1.3" }}>
                实时更新影片排名，就是要你好看
              </span>
            </div>
          </div>

          {/* Category tabs */}
          <div
            className="shrink-0 flex overflow-x-auto"
            style={{
              height: 36,
              marginTop: 14,
              paddingLeft: 16,
              paddingRight: 16,
              borderBottom: "0.5px solid rgba(255,255,255,0.1)",
            }}
          >
            {categories.map((cat, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(index)}
                  className="flex shrink-0 flex-col items-center justify-center"
                  style={{ height: 36, marginRight: index < categories.length - 1 ? 24 : 0 }}
                >
                  <span
                    style={{
                      fontSize: isSelected ? 15 : 14,
                      fontWeight: isSelected ? 700 : 400,
                      color: isSelected ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                      lineHeight: "1",
                    }}
                  >
                    {cat.name}
                  </span>
                  <div
                    className="mt-1.5"
                    style={{
                      height: 2,
                      borderRadius: 1,
                      background: isSelected ? "#FFFFFF" : "transparent",
                      width: "100%",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Movie list */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ padding: "12px 12px 0 12px" }}
            onScroll={(e) => {
              const el = e.currentTarget;
              if (el.scrollHeight - el.scrollTop - el.clientHeight < 200) {
                handleLoadMore();
              }
            }}
          >
            {!currentData || (currentData.isLoading && currentData.movies.length === 0) ? (
              <LoadingSpinner />
            ) : currentData.movies.length === 0 ? (
              <EmptyState text="暂无数据" />
            ) : (
              <>
                {currentData.movies.map((movie, index) => {
                  const tags = getMovieTags(movie);
                  const statusText = getMovieStatusText(movie);
                  const desc = getMoviePlainDescription(movie);
                  return (
                    <div key={movie.id} style={{ marginBottom: 16 }}>
                      <MovieListTile
                        cover={movie.cover}
                        title={movie.title}
                        rank={index + 1}
                        tags={tags.length > 0 ? tags : undefined}
                        statusText={statusText || undefined}
                        description={desc || undefined}
                        onTap={() => router.push(`/movie/${movie.id}`)}
                      />
                    </div>
                  );
                })}
                {currentData.isLoading && <LoadingSpinner />}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
