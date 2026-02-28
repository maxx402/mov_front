"use client";

import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { FilterStore } from "@/stores/filter-store";
import { FilterBar } from "@/components/feature/filter-bar";
import { OptimizedImage } from "@/components/common/optimized-image";
import { InfiniteList } from "@/components/common/infinite-list";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import type { Movie } from "@/domain/entities/movie";
import { isMovieFHD, getMovieStatusText } from "@/domain/entities/movie";

const FilterPage = observer(function FilterPage() {
  const container = useContainer();
  const router = useRouter();
  const store = useMemo(
    () => container.get<FilterStore>(DI_KEYS.FilterStore),
    [container],
  );

  useEffect(() => {
    store.init();
  }, [store]);

  // Build filter indicator text
  const filterText = [
    store.selectedCategoryId
      ? store.categories.find((c) => c.id === store.selectedCategoryId)?.name
      : "全部",
    store.selectedArea || "全部地区",
    store.selectedYear || "全部年份",
    store.selectedGenreId
      ? store.genres.find((g) => g.id === store.selectedGenreId)?.name
      : "全部类型",
    store.selectedSort === "latest"
      ? "最新"
      : store.selectedSort === "popular"
        ? "人气"
        : "评分",
  ].join("-");

  const showIndicator =
    store.selectedCategoryId !== "" ||
    store.selectedArea !== "" ||
    store.selectedYear !== "" ||
    store.selectedGenreId !== "";

  return (
    <div className="min-h-screen bg-scaffold">
      {/* AppBar - blurred overlay */}
      <header
        className="sticky top-0 z-40 pt-safe"
        style={{
          background: "rgba(13, 12, 11, 0.9)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {/* Search bar */}
        <div
          className="flex items-center justify-center"
          style={{ padding: "12px 14px 10px" }}
        >
          <button
            onClick={() => router.push("/search")}
            className="flex items-center"
            style={{
              width: 347,
              maxWidth: "100%",
              height: 32,
              borderRadius: 16,
              background: "rgba(255, 255, 255, 0.1)",
              padding: "0 16px",
            }}
          >
            <Image
              src="/svgs/ic_search.svg"
              alt="search"
              width={14}
              height={14}
              style={{ opacity: 0.8, flexShrink: 0 }}
            />
            <span
              className="ml-3 flex-1 text-left truncate"
              style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.6)" }}
            >
              搜索电影、电视剧、综艺、动漫等
            </span>
          </button>
        </div>
        {/* Filter indicator */}
        {showIndicator && (
          <div
            className="truncate"
            style={{
              height: 24,
              paddingLeft: 14,
              paddingRight: 14,
              paddingBottom: 10,
              fontSize: 15,
              color: "#F84048",
              lineHeight: "24px",
            }}
          >
            {filterText}
          </div>
        )}
      </header>

      {/* Filter bar */}
      <FilterBar
        categories={store.categories}
        areas={store.areas}
        years={store.years}
        genres={store.genres}
        selectedCategoryId={store.selectedCategoryId}
        selectedArea={store.selectedArea}
        selectedYear={store.selectedYear}
        selectedGenreId={store.selectedGenreId}
        selectedSort={store.selectedSort}
        onCategoryChange={(id) => store.setSelectedCategoryId(id)}
        onAreaChange={(area) => store.setSelectedArea(area)}
        onYearChange={(year) => store.setSelectedYear(year)}
        onGenreChange={(id) => store.setSelectedGenreId(id)}
        onSortChange={(sort) => store.setSelectedSort(sort)}
      />

      {/* Movie grid */}
      {store.isLoading && store.movies.length === 0 ? (
        <LoadingSpinner text="加载中..." />
      ) : store.errorMessage && store.movies.length === 0 ? (
        <ErrorState
          message={store.errorMessage}
          onRetry={() => store.refreshList()}
          retryText="重试"
        />
      ) : store.movies.length === 0 ? (
        <EmptyState text="暂无数据" />
      ) : (
        <InfiniteList
          onLoadMore={() => store.loadMore()}
          hasMore={store.paginator.hasMorePages}
          isLoading={store.isLoadingMore}
        >
          <div
            className="grid grid-cols-3"
            style={{ padding: "12px 10.5px 0", gap: "12px 9px" }}
          >
            {store.movies.map((movie) => (
              <FilterMovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </InfiniteList>
      )}
    </div>
  );
});

function FilterMovieCard({ movie }: { movie: Movie }) {
  const fhd = isMovieFHD(movie);
  const statusText = getMovieStatusText(movie);

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="flex flex-col"
    >
      {/* Cover */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "112 / 151", borderRadius: 8 }}
      >
        <OptimizedImage
          src={movie.cover}
          alt={movie.title}
          width={112}
          height={151}
          fill
          sizes="33vw"
          rounded="rounded-lg"
          className="h-full w-full"
        />
        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 32,
            background: "linear-gradient(to top, rgba(0,0,0,0.54), transparent)",
            borderRadius: "0 0 8px 8px",
          }}
        />
        {/* FHD badge */}
        {fhd && (
          <Image
            src="/images/fhd_badge_r.webp"
            alt="FHD"
            width={28}
            height={14}
            className="absolute"
            style={{ top: 6, right: 6 }}
          />
        )}
        {/* Status + Rating */}
        <div
          className="absolute flex items-end"
          style={{ bottom: 8, right: 8, gap: 6 }}
        >
          {statusText && (
            <span style={{ fontSize: 12, color: "#E4D5D1", lineHeight: "16px" }}>
              {statusText}
            </span>
          )}
          {movie.score > 0 && (
            <span style={{ fontSize: 16, fontWeight: 500, color: "#FFFFFF" }}>
              {movie.score.toFixed(1)}
            </span>
          )}
        </div>
      </div>
      {/* Title */}
      <p
        className="truncate"
        style={{ fontSize: 14, color: "#FFFFFF", marginTop: 10 }}
      >
        {movie.title}
      </p>
    </Link>
  );
}

export default FilterPage;
