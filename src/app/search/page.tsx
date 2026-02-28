"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { ISearchRepository } from "@/domain/repositories/search-repository";
import type { ICategoryRepository } from "@/domain/repositories/category-repository";
import type { IMovieRepository } from "@/domain/repositories/movie-repository";
import type { SearchHistory as SearchHistoryType, HotKeyword } from "@/domain/entities/search";
import type { Category } from "@/domain/entities/category";
import type { Movie } from "@/domain/entities/movie";
import { getMovieStatusText, getMoviePlainDescription } from "@/domain/entities/movie";
import { SearchBar } from "@/components/feature/search-bar";
import { MovieListTile } from "@/components/common/movie-list-tile";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { EmptyState } from "@/components/common/empty-state";

export default function SearchPage() {
  const router = useRouter();
  const container = useContainer();
  const searchRepo = useMemo(() => container.get<ISearchRepository>(DI_KEYS.SearchRepository), [container]);
  const categoryRepo = useMemo(() => container.get<ICategoryRepository>(DI_KEYS.CategoryRepository), [container]);
  const movieRepo = useMemo(() => container.get<IMovieRepository>(DI_KEYS.MovieRepository), [container]);

  // Search state
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [hasMoreResults, setHasMoreResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentKeyword, setCurrentKeyword] = useState("");

  // Search history (from API)
  const [searchHistory, setSearchHistory] = useState<SearchHistoryType[]>([]);

  // Hot keywords (from API)
  const [hotKeywords, setHotKeywords] = useState<HotKeyword[]>([]);
  const [isLoadingHotKeywords, setIsLoadingHotKeywords] = useState(true);

  // Hot rank
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [rankMovies, setRankMovies] = useState<Movie[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadSearchHistory = async () => {
      const result = await searchRepo.getSearchHistory();
      if (result.isSuccess && result.value) {
        setSearchHistory(result.value);
      }
    };

    const loadHotKeywords = async () => {
      const result = await searchRepo.getHotKeywords();
      if (result.isSuccess && result.value) {
        setHotKeywords(result.value);
      }
      setIsLoadingHotKeywords(false);
    };

    const loadCategories = async () => {
      const result = await categoryRepo.getCategories();
      if (result.isSuccess && result.value) {
        setCategories(result.value);
        if (result.value.length > 0) {
          loadRankMovies(result.value[0].id);
        }
      }
      setIsLoadingCategories(false);
    };

    loadSearchHistory();
    loadHotKeywords();
    loadCategories();
  }, [searchRepo, categoryRepo]);

  const loadRankMovies = async (categoryId: string) => {
    setIsLoadingMovies(true);
    const result = await movieRepo.getHotRankMovies({ categoryId, page: 1, pageSize: 10 });
    if (result.isSuccess && result.value) {
      setRankMovies(result.value.items.slice());
    }
    setIsLoadingMovies(false);
  };

  const executeSearch = useCallback(async (keyword: string) => {
    const q = keyword.trim();
    if (!q) return;

    // Add to search history
    searchRepo.addSearchHistory(q);
    const histResult = await searchRepo.getSearchHistory();
    if (histResult.isSuccess && histResult.value) {
      setSearchHistory(histResult.value);
    }

    setIsSearching(true);
    setIsLoadingResults(true);
    setSearchResults([]);
    setCurrentPage(1);
    setCurrentKeyword(q);

    const result = await searchRepo.searchMovies({ keyword: q, page: 1, pageSize: 20 });
    if (result.isSuccess && result.value) {
      setSearchResults(result.value.items.slice());
      setHasMoreResults(result.value.paginator.hasMorePages);
    }
    setIsLoadingResults(false);
  }, [searchRepo]);

  const loadMoreResults = async () => {
    if (isLoadingResults || !hasMoreResults) return;
    setIsLoadingResults(true);
    const nextPage = currentPage + 1;
    const result = await searchRepo.searchMovies({ keyword: currentKeyword, page: nextPage, pageSize: 20 });
    if (result.isSuccess && result.value) {
      setSearchResults((prev) => [...prev, ...result.value!.items]);
      setHasMoreResults(result.value.paginator.hasMorePages);
      setCurrentPage(nextPage);
    }
    setIsLoadingResults(false);
  };

  const handleSearch = useCallback(() => {
    executeSearch(query);
  }, [query, executeSearch]);

  const handleKeywordSelect = (keyword: string) => {
    setQuery(keyword);
    executeSearch(keyword);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    searchRepo.clearSearchHistory();
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (!value && isSearching) {
      setIsSearching(false);
      setSearchResults([]);
      setCurrentKeyword("");
    }
  };

  const handleCategorySelect = (index: number) => {
    if (index === selectedCategoryIndex) return;
    setSelectedCategoryIndex(index);
    loadRankMovies(categories[index].id);
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
        className="sticky top-0 z-40 flex shrink-0 items-center bg-scaffold pt-safe"
        style={{
          paddingBottom: 8,
          borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{ height: 42, padding: "0 12px" }}
          className="flex items-center"
        >
          <ChevronLeft size={20} className="text-text-primary" />
        </button>
        <SearchBar
          value={query}
          onChange={handleQueryChange}
          onSubmit={handleSearch}
          autoFocus
          className="flex-1"
        />
        <button
          onClick={handleSearch}
          style={{ height: 42, padding: "0 14px", fontSize: 16, fontWeight: 500, color: "#FFE5B4" }}
        >
          搜索
        </button>
      </div>

      {/* Content */}
      {isSearching ? (
        <div
          className="flex-1 overflow-y-auto"
          onScroll={(e) => {
            const el = e.currentTarget;
            if (el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
              loadMoreResults();
            }
          }}
        >
          {isLoadingResults && searchResults.length === 0 ? (
            <LoadingSpinner text="搜索中..." />
          ) : searchResults.length === 0 ? (
            <EmptyState text={`没有找到"${currentKeyword}"相关内容`} />
          ) : (
            <div style={{ padding: "8px 12px" }}>
              {searchResults.map((movie) => {
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
              {isLoadingResults && <LoadingSpinner />}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto" style={{ marginTop: 10 }}>
          {/* Search History */}
          {searchHistory.length > 0 && (
            <div style={{ padding: "16px 12px 0" }}>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", lineHeight: "16px" }}>
                  搜索历史
                </span>
                <button onClick={clearHistory} style={{ padding: 4 }}>
                  <img
                    src="/svgs/ic_trash.svg"
                    alt="clear"
                    width={18}
                    height={18}
                    style={{ opacity: 0.6 }}
                  />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap" style={{ gap: 8 }}>
                {searchHistory.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleKeywordSelect(item.keyword)}
                    style={{
                      background: "rgba(26, 26, 26, 0.65)",
                      borderRadius: 4,
                      padding: "8px 14px",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: "16px",
                    }}
                  >
                    {item.keyword}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          {searchHistory.length > 0 && (isLoadingHotKeywords || hotKeywords.length > 0) && (
            <div style={{ margin: "18px 12px", height: 0.5, background: "rgba(255, 255, 255, 0.1)" }} />
          )}

          {/* Hot Keywords */}
          {(isLoadingHotKeywords || hotKeywords.length > 0) && (
            <div style={{ padding: "0 12px" }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", lineHeight: "16px" }}>
                热门搜索🔥
              </span>
              {isLoadingHotKeywords ? (
                <div className="flex items-center justify-center" style={{ padding: "20px 0" }}>
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="mt-3 flex flex-wrap" style={{ gap: 8 }}>
                  {hotKeywords.map((kw, index) => {
                    const isHot = index < 2;
                    return (
                      <button
                        key={kw.id}
                        onClick={() => handleKeywordSelect(kw.keyword)}
                        className="flex items-center"
                        style={{
                          background: isHot ? "rgba(245, 60, 61, 0.1)" : "rgba(26, 26, 26, 0.65)",
                          borderRadius: 4,
                          padding: "8px 14px",
                          fontSize: 13,
                          fontWeight: 500,
                          color: isHot ? "#F53C3D" : "rgba(255, 255, 255, 0.8)",
                          lineHeight: "16px",
                        }}
                      >
                        {kw.keyword}
                        {isHot && (
                          <span
                            className="ml-1.5 flex items-center justify-center"
                            style={{
                              width: 14,
                              height: 16,
                              background: "#F53C3D",
                              borderRadius: 2,
                              fontSize: 10,
                              fontWeight: 700,
                              color: "#FFFFFF",
                              lineHeight: "1",
                            }}
                          >
                            热
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          {(isLoadingHotKeywords || hotKeywords.length > 0) && (
            <div style={{ margin: "18px 12px", height: 0.5, background: "rgba(255, 255, 255, 0.1)" }} />
          )}

          {/* Hot Rank Section */}
          <div style={{ paddingBottom: 30 }}>
            <div style={{ paddingLeft: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", lineHeight: "16px" }}>
                热播排行榜
              </span>
            </div>

            {/* Category tabs */}
            {!isLoadingCategories && categories.length > 0 && (
              <div
                className="mt-3 flex overflow-x-auto"
                style={{ paddingLeft: 16, paddingRight: 16, height: 36 }}
              >
                {categories.map((cat, index) => {
                  const isSelected = index === selectedCategoryIndex;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(index)}
                      className="flex shrink-0 flex-col items-center"
                      style={{ marginRight: index < categories.length - 1 ? 24 : 0 }}
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
            )}

            {/* Rank list */}
            <div className="mt-3" style={{ padding: "0 12px 0 12px" }}>
              {isLoadingMovies || isLoadingCategories ? (
                <div className="flex items-center justify-center" style={{ padding: "40px 0" }}>
                  <LoadingSpinner />
                </div>
              ) : rankMovies.length === 0 ? (
                <div className="flex items-center justify-center" style={{ padding: "40px 0" }}>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>暂无数据</span>
                </div>
              ) : (
                <>
                  {rankMovies.map((movie, index) => {
                    const tags = getMovieTags(movie);
                    const statusText = getMovieStatusText(movie);
                    const desc = getMoviePlainDescription(movie);
                    return (
                      <div key={movie.id} style={{ marginBottom: index < rankMovies.length - 1 ? 16 : 0 }}>
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
                </>
              )}
            </div>

            {/* View more button */}
            {rankMovies.length > 0 && (
              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => router.push("/rank")}
                  className="flex items-center justify-center"
                  style={{
                    width: 349,
                    height: 45,
                    background: "#252321",
                    borderRadius: 23,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#E4D5D1", lineHeight: "14px" }}>
                    查看更多热播内容
                  </span>
                  <ChevronLeft size={12} color="#E4D5D1" style={{ transform: "rotate(180deg)", marginLeft: 4 }} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
