"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { DiscoverStore } from "@/stores/discover-store";
import { TopicCard } from "@/components/feature/topic-card";
import { ActorCard } from "@/components/feature/actor-card";
import { InfiniteList } from "@/components/common/infinite-list";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import { SectionHeader } from "@/components/common/section-header";

const COVER_HEIGHT = 160;
const TAB_OVERLAP = 50;
const TAB_BAR_HEIGHT = 38;
const TAB_TOP_MARGIN = 13;
const TAB_BOTTOM_MARGIN = 20;

const DiscoverPage = observer(function DiscoverPage() {
  const container = useContainer();
  const store = useMemo(() => container.get<DiscoverStore>(DI_KEYS.DiscoverStore), [container]);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [bgOffset, setBgOffset] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    store.init();
  }, [store]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const offset = el.scrollTop;
    setBgOffset(offset > 0 ? offset : 0);
    setPinned(offset >= COVER_HEIGHT - TAB_OVERLAP);
  }, []);

  const tabs = ["专题", "明星"];
  const headerHeight = COVER_HEIGHT - TAB_OVERLAP + TAB_TOP_MARGIN + TAB_BAR_HEIGHT + TAB_BOTTOM_MARGIN;

  return (
    <div className="relative min-h-screen overflow-hidden bg-scaffold">
      {/* Layer 1: Background */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: 0,
          height: COVER_HEIGHT,
          transform: 'translateY(' + (-bgOffset) + 'px)',
          background: store.selectedTabIndex === 0
            ? "linear-gradient(180deg, #3A1516, #0D0C0B)"
            : "linear-gradient(180deg, #1A2A3A, #0D0C0B)",
        }}
      />

      {/* Layer 2: Content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="relative h-screen overflow-y-auto"
      >
        {/* Header spacer */}
        <div style={{ height: headerHeight }} />

        {store.isLoading ? (
          <LoadingSpinner text="加载中..." />
        ) : store.errorMessage ? (
          <ErrorState
            message={store.errorMessage}
            onRetry={() => store.refresh()}
            retryText="重试"
          />
        ) : store.selectedTabIndex === 0 ? (
          /* Topics */
          <InfiniteList
            onLoadMore={() => store.loadMoreTopics()}
            hasMore={store.topicPaginator.hasMorePages}
            isLoading={false}
          >
            {store.topicGroups.length === 0 ? (
              <EmptyState text="暂无数据" />
            ) : (
              store.topicGroups.map((group) => (
                <section key={group.id}>
                  <SectionHeader title={group.name} onMore={() => router.push('/topic-group/' + group.id)} moreText="更多" />
                  <div className="grid grid-cols-2 gap-2.5 px-2.5 pb-2">
                    {group.topics.slice(0, 4).map((topic) => (
                      <TopicCard key={topic.id} topic={topic} />
                    ))}
                  </div>
                </section>
              ))
            )}
          </InfiniteList>
        ) : (
          /* Actors */
          <InfiniteList
            onLoadMore={() => store.loadMoreActors()}
            hasMore={store.actorPaginator.hasMorePages}
            isLoading={false}
          >
            {store.actors.length === 0 ? (
              <EmptyState text="暂无数据" />
            ) : (
              <div className="flex flex-col gap-4 px-4 py-3">
                {store.actors.map((actor) => (
                  <ActorCard key={actor.id} actor={actor} />
                ))}
              </div>
            )}
          </InfiniteList>
        )}

        <div className="h-20" />
      </div>

      {/* Layer 3: Tab Card or Pinned Bar */}
      {pinned ? (
        /* Pinned Tab Bar */
        <div
          className="fixed top-0 left-0 right-0 z-40 pt-safe"
          style={{
            background: "#3A1516",
            paddingBottom: TAB_BOTTOM_MARGIN,
          }}
        >
          <div style={{ paddingTop: TAB_TOP_MARGIN }}>
            <DiscoverTabBar
              tabs={tabs}
              selectedIndex={store.selectedTabIndex}
              onSelect={(idx) => store.setSelectedTabIndex(idx)}
            />
          </div>
        </div>
      ) : (
        /* Floating Tab Card */
        <div
          className="absolute left-0 right-0 z-30"
          style={{
            top: COVER_HEIGHT - TAB_OVERLAP - bgOffset,
          }}
        >
          <div
            className="mx-auto"
            style={{
              width: "100%",
              paddingTop: TAB_TOP_MARGIN,
              paddingBottom: TAB_BOTTOM_MARGIN,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              background: "linear-gradient(180deg, #3A1516, #0D0C0B)",
            }}
          >
            <DiscoverTabBar
              tabs={tabs}
              selectedIndex={store.selectedTabIndex}
              onSelect={(idx) => store.setSelectedTabIndex(idx)}
            />
          </div>
        </div>
      )}
    </div>
  );
});

function DiscoverTabBar({
  tabs,
  selectedIndex,
  onSelect,
}: {
  tabs: string[];
  selectedIndex: number;
  onSelect: (idx: number) => void;
}) {
  return (
    <div
      className="mx-auto flex"
      style={{
        width: 349,
        maxWidth: "calc(100% - 26px)",
        height: TAB_BAR_HEIGHT,
        padding: "4px 5px",
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: 19,
      }}
    >
      {tabs.map((tab, idx) => {
        const isSelected = idx === selectedIndex;
        return (
          <button
            key={tab}
            onClick={() => onSelect(idx)}
            className="flex flex-1 items-center justify-center"
            style={{
              height: 30,
              borderRadius: 15,
              fontSize: 15,
              fontWeight: 700,
              color: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
              backgroundImage: isSelected ? "url(/images/ic_discover_tab_btn.webp)" : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export default DiscoverPage;
