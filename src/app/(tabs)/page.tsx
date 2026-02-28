"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useHomeStore, useAppConfigStore } from "@/stores/use-store";
import { CategoryTabBar } from "@/components/common/category-tab-bar";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ErrorState } from "@/components/common/error-state";
import { BannerCarousel } from "@/components/feature/banner-carousel";
import { ChannelSection } from "@/components/feature/channel-section";
import { HotRankCard } from "@/components/feature/hot-rank-card";
import { NoticeBar } from "@/components/feature/notice-bar";

const HomePage = observer(function HomePage() {
  const router = useRouter();
  const homeStore = useHomeStore();
  const appConfigStore = useAppConfigStore();
  const [appBarOpacity, setAppBarOpacity] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    homeStore.init();
    appConfigStore.loadAppConfig();
  }, [homeStore, appConfigStore]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = 200;
    const opacity = Math.min(el.scrollTop / maxScroll, 1) * 0.96;
    setAppBarOpacity(opacity);
  }, []);

  const categoryHome = homeStore.selectedCategory
    ? homeStore.getCategoryHome(homeStore.selectedCategory.id)
    : undefined;

  if (homeStore.isLoading && !categoryHome) {
    return (
      <div className="min-h-screen bg-scaffold">
        <LoadingSpinner text="加载中..." />
      </div>
    );
  }

  if (homeStore.errorMessage && !categoryHome) {
    return (
      <div className="min-h-screen bg-scaffold">
        <ErrorState
          message={homeStore.errorMessage}
          onRetry={() => homeStore.refresh()}
          retryText="重试"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-scaffold">
      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-screen overflow-y-auto"
      >
        {/* Spacer for AppBar */}
        <div
          className="pt-safe"
          style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 80px)" }}
        />

        {/* Category Content */}
        {categoryHome && (
          <div className="flex flex-col pb-20">
            {/* 1. Banner Carousel */}
            {categoryHome.banners.length > 0 && (
              <BannerCarousel banners={categoryHome.banners} />
            )}

            {/* 2. Notice Bar (after banner) */}
            {appConfigStore.marqueeTexts.length > 0 && (
              <div style={{ padding: "12px 12px" }}>
                <NoticeBar texts={appConfigStore.marqueeTexts} />
              </div>
            )}

            {/* 3. Hot Rank */}
            {categoryHome.hotMovies.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <HotRankCard movies={categoryHome.hotMovies} />
              </div>
            )}

            {/* 5. Channel Sections */}
            <div className="flex flex-col" style={{ gap: 16, marginTop: 16 }}>
              {categoryHome.channels.map((channel) => (
                <ChannelSection key={channel.id} channel={channel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating AppBar */}
      <div
        className="fixed top-0 left-0 right-0 z-40 pt-safe"
        style={{ pointerEvents: "auto" }}
      >
        {/* Background layer */}
        <div
          className="absolute inset-0"
          style={{ background: `rgba(13, 12, 11, ${appBarOpacity})` }}
        />
        {/* Content */}
        <div className="relative" style={{ padding: "8px 14px 8px" }}>
          {/* Row 1: Logo + Search */}
          <div className="flex items-center" style={{ gap: 8 }}>
            <Image
              src="/images/logo_with_name.webp"
              alt="Logo"
              width={100}
              height={24}
              priority
              style={{ height: 23.5, width: "auto" }}
            />
            <button
              onClick={() => router.push("/search")}
              className="flex flex-1 items-center"
              style={{
                height: 32,
                borderRadius: 18,
                border: "0.5px solid rgba(255, 255, 255, 0.55)",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.17)",
                padding: "0 16px",
              }}
            >
              <span
                className="flex-1 text-left"
                style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.6)" }}
              >
                搜索你想看的影片
              </span>
              <Image
                src="/svgs/ic_search.svg"
                alt="search"
                width={14}
                height={14}
              />
            </button>
          </div>
          {/* Row 2: Category Tabs */}
          {homeStore.categories.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <CategoryTabBar
                items={homeStore.categories}
                selectedIndex={homeStore.selectedCategoryIndex}
                onSelect={(idx) => homeStore.setSelectedCategoryIndex(idx)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default HomePage;
