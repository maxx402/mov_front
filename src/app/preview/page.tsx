"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { PreviewStore } from "@/stores/preview-store";
import type { MoviesByDate } from "@/domain/entities/movies-by-date";
import type { Movie } from "@/domain/entities/movie";
import { OptimizedImage } from "@/components/common/optimized-image";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { AuthGuard } from "@/components/common/auth-guard";

const COVER_HEIGHT = 160;
const TAB_CARD_OVERLAP = 50;
const PIN_THRESHOLD = COVER_HEIGHT - TAB_CARD_OVERLAP;

/** Movie card for preview grid */
function PreviewMovieCard({
  movie,
  isUpcoming,
  onReserve,
}: {
  movie: Movie;
  isUpcoming: boolean;
  onReserve?: () => void;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col" style={{ width: "100%" }}>
      <button
        onClick={() => router.push(`/movie/${movie.id}`)}
        className="relative overflow-hidden"
        style={{ width: "100%", aspectRatio: "105/150", borderRadius: 5 }}
      >
        <OptimizedImage
          src={movie.cover}
          alt={movie.title}
          width={105}
          height={150}
          rounded="rounded-[5px]"
        />
      </button>
      <span
        className="mt-2 line-clamp-1"
        style={{ fontSize: 13, color: "#FFFFFF", lineHeight: "16px" }}
      >
        {movie.title}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (isUpcoming && onReserve) {
            onReserve();
          } else {
            router.push(`/movie/${movie.id}`);
          }
        }}
        className="mt-2 flex items-center justify-center"
        style={{
          height: 28,
          borderRadius: 14,
          background: isUpcoming
            ? movie.isReserved
              ? "rgba(255,255,255,0.08)"
              : "linear-gradient(135deg, #FFE5B4, #FFC65C)"
            : "linear-gradient(135deg, #FFE5B4, #FFC65C)",
          fontSize: 12,
          fontWeight: 500,
          color: isUpcoming && movie.isReserved ? "rgba(255,255,255,0.5)" : "#1A1A1A",
        }}
      >
        {isUpcoming
          ? movie.isReserved
            ? "已预约"
            : "预约"
          : "观看"}
      </button>
    </div>
  );
}

/** Date section header */
function DateSectionHeader({ label }: { label: string }) {
  return (
    <div
      className="flex items-center"
      style={{
        padding: "6px 12px",
        borderRadius: 4,
        background: "rgba(0,0,0,0.4)",
        marginBottom: 12,
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
        {label}
      </span>
    </div>
  );
}

/** Movie grid (3 columns) grouped by date */
function MoviesByDateGrid({
  groups,
  isUpcoming,
  onReserve,
}: {
  groups: readonly MoviesByDate[];
  isUpcoming: boolean;
  onReserve?: (movieId: string) => void;
}) {
  return (
    <div style={{ padding: "0 16px" }}>
      {groups.map((group) => (
        <div key={group.date} className="mb-4">
          <DateSectionHeader label={group.label} />
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px 9px",
            }}
          >
            {group.movies.map((movie) => (
              <PreviewMovieCard
                key={movie.id}
                movie={movie}
                isUpcoming={isUpcoming}
                onReserve={onReserve ? () => onReserve(movie.id) : undefined}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const PreviewContent = observer(function PreviewContent() {
  const router = useRouter();
  const container = useContainer();
  const store = useMemo(
    () => container.get<PreviewStore>(DI_KEYS.PreviewStore),
    [container],
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    store.init();
  }, [store]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const y = scrollRef.current.scrollTop;
    setScrollOffset(y);
    setIsPinned(y > PIN_THRESHOLD);
  }, []);

  const handleReserve = useCallback(
    async (movieId: string) => {
      await store.toggleReservation(movieId);
    },
    [store],
  );

  // Order button opacity: fade out over first 100px of scroll
  const orderBtnOpacity = Math.max(0, 1 - scrollOffset / 100);

  return (
    <div className="relative flex h-screen flex-col bg-scaffold">
      {/* Pinned AppBar when scrolled */}
      <div
        className="absolute inset-x-0 top-0 z-20 flex shrink-0 items-center pt-safe"
        style={{
          background: isPinned ? "rgba(13,12,11,0.96)" : "transparent",
          transition: "background 0.2s",
        }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center"
          style={{ height: 42, padding: "0 12px" }}
        >
          <ChevronLeft size={20} className="text-text-primary" />
          <span style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF", marginLeft: 4 }}>
            返回
          </span>
        </button>
        <span className="flex-1 text-center" style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF" }}>
          预告
        </span>
        {/* My reservations button */}
        <button
          onClick={() => router.push("/reservations")}
          style={{
            height: 42,
            padding: "0 14px",
            fontSize: 13,
            color: "#FFE5B4",
            opacity: orderBtnOpacity,
            transition: "opacity 0.1s",
          }}
        >
          我的预约
        </button>
      </div>

      {/* Scrollable content */}
      {store.isLoading ? (
        <LoadingSpinner text="加载中..." />
      ) : (
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto"
          onScroll={handleScroll}
        >
          {/* Background cover with parallax */}
          <div
            className="relative overflow-hidden"
            style={{ height: COVER_HEIGHT }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, rgba(255,229,180,0.15) 0%, rgba(26,26,26,1) 100%)",
                transform: `translateY(${-scrollOffset * 0.3}px)`,
              }}
            />
          </div>

          {/* Tab card overlapping the cover */}
          <div
            className="relative z-10"
            style={{ marginTop: -TAB_CARD_OVERLAP }}
          >
            {/* Tab bar */}
            <div className="flex items-center justify-center" style={{ padding: "13px 0 10px" }}>
              <div
                className="flex items-center overflow-hidden"
                style={{
                  width: 349,
                  maxWidth: "calc(100% - 26px)",
                  height: 38,
                  borderRadius: 19,
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                {["即将上映", "已经上映"].map((label, i) => {
                  const isSelected = store.selectedTabIndex === i;
                  return (
                    <button
                      key={label}
                      onClick={() => {
                        store.setSelectedTabIndex(i);
                        // Reset scroll when switching tabs
                        if (scrollRef.current) {
                          scrollRef.current.scrollTop = 0;
                          setScrollOffset(0);
                          setIsPinned(false);
                        }
                      }}
                      className="relative flex flex-1 items-center justify-center"
                      style={{ height: 38 }}
                    >
                      {isSelected && (
                        <img
                          src="/images/ic_preview_tab_btn.webp"
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}
                      <span
                        className="relative z-10"
                        style={{
                          fontSize: 14,
                          fontWeight: isSelected ? 600 : 400,
                          color: isSelected ? "#1A1A1A" : "rgba(255,255,255,0.6)",
                        }}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category bar for "已经上映" tab */}
            {store.selectedTabIndex === 1 && store.releasedCategories.length > 0 && (
              <div
                className="flex overflow-x-auto"
                style={{
                  height: 40,
                  padding: "0 16px",
                  gap: 16,
                  scrollbarWidth: "none",
                }}
              >
                {store.releasedCategories.map((cat, i) => {
                  const isSelected = store.selectedCategoryIndex === i;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => store.setSelectedCategoryIndex(i)}
                      className="shrink-0 flex items-center"
                    >
                      <span
                        style={{
                          fontSize: isSelected ? 15 : 14,
                          fontWeight: isSelected ? 600 : 400,
                          color: isSelected ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                        }}
                      >
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Movie content */}
            <div style={{ paddingTop: 12 }}>
              {store.selectedTabIndex === 0 ? (
                <MoviesByDateGrid
                  groups={store.upcomingMovies}
                  isUpcoming
                  onReserve={handleReserve}
                />
              ) : (
                <MoviesByDateGrid
                  groups={
                    store.selectedCategory
                      ? store.releasedMoviesCache.get(store.selectedCategory.id) ?? []
                      : []
                  }
                  isUpcoming={false}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default function PreviewPage() {
  return (
    <AuthGuard>
      <PreviewContent />
    </AuthGuard>
  );
}
