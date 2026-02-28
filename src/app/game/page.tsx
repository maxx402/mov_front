"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { GameStore } from "@/stores/game-store";
import type { Banner } from "@/domain/entities/banner";
import { hasBannerLink, BannerLinkType } from "@/domain/entities/banner";
import { OptimizedImage } from "@/components/common/optimized-image";
import { LoadingSpinner } from "@/components/common/loading-spinner";

const BANNER_HEIGHT = 316;
const APPBAR_SCROLL_DISTANCE = 100;
const APPBAR_MAX_OPACITY = 0.96;

/** Banner carousel */
function BannerCarousel({
  banners,
  onTap,
}: {
  banners: readonly Banner[];
  onTap: (banner: Banner) => void;
}) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (banners.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <div className="relative overflow-hidden" style={{ height: BANNER_HEIGHT }}>
      {banners.map((banner, i) => (
        <button
          key={banner.id}
          onClick={() => onTap(banner)}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <OptimizedImage
            src={banner.cover}
            alt={banner.title ?? ""}
            width={375}
            height={BANNER_HEIGHT}
            rounded=""
          />
        </button>
      ))}
      {/* Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center" style={{ gap: 6 }}>
          {banners.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === current ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background: i === current ? "#FFE5B4" : "rgba(255,255,255,0.4)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const GameContent = observer(function GameContent() {
  const router = useRouter();
  const container = useContainer();
  const store = useMemo(
    () => container.get<GameStore>(DI_KEYS.GameStore),
    [container],
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    store.init();
  }, [store]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    setScrollOffset(scrollRef.current.scrollTop);
  }, []);

  const appBarBgOpacity = Math.min(scrollOffset / APPBAR_SCROLL_DISTANCE, 1) * APPBAR_MAX_OPACITY;
  const titleOpacity = appBarBgOpacity / APPBAR_MAX_OPACITY;

  const handleBannerTap = useCallback(
    (banner: Banner) => {
      if (!hasBannerLink(banner)) return;
      switch (banner.linkType) {
        case BannerLinkType.Movie:
        case BannerLinkType.Episode:
          if (banner.linkValue) router.push(`/movie/${banner.linkValue}`);
          break;
        case BannerLinkType.Actor:
          if (banner.linkValue) router.push(`/star/${banner.linkValue}`);
          break;
        case BannerLinkType.Topic:
          if (banner.linkValue) router.push(`/topic/${banner.linkValue}`);
          break;
        case BannerLinkType.Url:
          if (banner.linkValue) window.open(banner.linkValue, "_blank");
          break;
        default:
          break;
      }
    },
    [router],
  );

  const isLoading = store.isLoadingBanners && store.isLoadingCategories;

  return (
    <div className="relative flex h-screen flex-col bg-scaffold">
      {/* Pinned AppBar */}
      <div
        className="absolute inset-x-0 top-0 z-20 flex items-center pt-safe"
        style={{
          background: `rgba(13,12,11,${appBarBgOpacity})`,
        }}
      >
        {/* Logo left */}
        <div className="flex items-center" style={{ height: 44, paddingLeft: 12 }}>
          <img
            src="/images/logo.webp"
            alt="Logo"
            style={{ height: 23.5 }}
          />
        </div>

        {/* Title center */}
        <span
          className="flex-1 text-center"
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "#FFFFFF",
            opacity: titleOpacity,
            transition: "opacity 0.1s",
          }}
        >
          游戏中心
        </span>

        {/* Right spacer */}
        <div style={{ width: 100 }} />
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner text="加载中..." />
      ) : (
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto"
          onScroll={handleScroll}
        >
          {/* Banner */}
          <BannerCarousel banners={store.banners} onTap={handleBannerTap} />

          {/* Category tabs */}
          {store.categories.length > 0 && (
            <div
              className="flex overflow-x-auto"
              style={{
                padding: "12px 12px 8px",
                gap: 8,
                scrollbarWidth: "none",
              }}
            >
              {store.categories.map((catInfo, i) => {
                const isSelected = store.selectedCategoryIndex === i;
                return (
                  <button
                    key={catInfo.category}
                    onClick={() => store.setSelectedCategoryIndex(i)}
                    className="relative shrink-0 flex items-center justify-center"
                    style={{ width: 116, height: 32 }}
                  >
                    {isSelected && (
                      <img
                        src="/images/ic_game_tab_bg.webp"
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ borderRadius: 16 }}
                      />
                    )}
                    <span
                      className="relative z-10"
                      style={{
                        fontSize: 14,
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {catInfo.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Game grid (2 columns) */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px 11px",
              padding: "12px 12px 24px",
            }}
          >
            {store.currentGames.map((game) => (
              <button
                key={game.id}
                onClick={() => window.open(game.link, "_blank")}
                className="relative overflow-hidden"
                style={{
                  borderRadius: 8,
                  aspectRatio: "174/187",
                }}
              >
                <OptimizedImage
                  src={game.image}
                  alt={game.title}
                  width={174}
                  height={187}
                  rounded="rounded-lg"
                />
                {/* Bottom gradient with title */}
                <div
                  className="absolute inset-x-0 bottom-0 flex items-end"
                  style={{
                    padding: "16px 8px 8px",
                    background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
                  }}
                >
                  <div className="flex min-w-0 flex-col">
                    <span
                      className="line-clamp-1"
                      style={{ fontSize: 13, fontWeight: 500, color: "#FFFFFF" }}
                    >
                      {game.title}
                    </span>
                    {game.subtitle && (
                      <span
                        className="mt-0.5 line-clamp-1"
                        style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}
                      >
                        {game.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default function GamePage() {
  return <GameContent />;
}
