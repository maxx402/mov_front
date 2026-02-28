"use client";

import { use, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import { useAppConfigStore } from "@/stores/use-store";
import type { MovieDetailStore } from "@/stores/movie-detail-store";
import type { Episode } from "@/domain/entities/episode";
import { MovieStatus } from "@/domain/entities/movie";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ErrorState } from "@/components/common/error-state";
import { VideoPlayer } from "@/components/feature/video-player";
import { DetailTabBar } from "@/components/feature/detail-tab-bar";
import { VideoBottomBar } from "@/components/feature/video-bottom-bar";
import { VideoTabContent } from "@/components/feature/video-tab-content";
import { CommentsTabContent } from "@/components/feature/comments-tab-content";
import { IntroTabContent } from "@/components/feature/intro-tab-content";
import { LineSwitchOverlay } from "@/components/feature/line-switch-overlay";

interface Props {
  params: Promise<{ id: string }>;
}

const MovieDetailPage = observer(function MovieDetailPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const container = useContainer();
  const store = useMemo(() => container.get<MovieDetailStore>(DI_KEYS.MovieDetailStore), [container]);
  const appConfigStore = useAppConfigStore();
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const [showLineSwitch, setShowLineSwitch] = useState(false);

  useEffect(() => {
    store.init(id);
    appConfigStore.loadAppConfig();
  }, [store, id, appConfigStore]);

  const currentEpisode = store.episodes.length > 0 ? store.episodes[currentEpisodeIndex] ?? null : null;
  const currentLines = currentEpisode?.playLines ?? [];

  // Load comments when switching to comments tab
  useEffect(() => {
    if (selectedTab === 1 && store.comments.length === 0) {
      store.loadComments();
    }
  }, [selectedTab, store]);

  if (store.isLoading) {
    return (
      <div className="flex h-screen flex-col bg-scaffold">
        <div className="relative shrink-0 w-full bg-black" style={{ aspectRatio: "3/2" }}>
          <button
            onClick={() => router.back()}
            className="absolute left-3 top-3 z-10"
          >
            <ChevronLeft size={24} color="white" />
          </button>
        </div>
        <LoadingSpinner text="加载中..." />
      </div>
    );
  }

  if (store.hasError || !store.movie) {
    return (
      <div className="flex h-screen flex-col bg-scaffold">
        <div className="relative shrink-0 w-full bg-black" style={{ aspectRatio: "3/2" }}>
          <button
            onClick={() => router.back()}
            className="absolute left-3 top-3 z-10"
          >
            <ChevronLeft size={24} color="white" />
          </button>
        </div>
        <ErrorState
          message={store.errorMessage ?? "出错了"}
          onRetry={() => store.refresh()}
          retryText="重试"
        />
      </div>
    );
  }

  const playLine = currentEpisode
    ? (currentLines[currentLineIndex] ?? currentLines[0])
    : undefined;

  const handleEpisodeSelect = (episode: Episode) => {
    const idx = store.episodes.findIndex((e) => e.id === episode.id);
    if (idx >= 0) {
      setCurrentEpisodeIndex(idx);
      setCurrentLineIndex(0);
    }
  };

  const handleEpisodeIndexSelect = (index: number) => {
    setCurrentEpisodeIndex(index);
    setCurrentLineIndex(0);
  };

  const handleLineSelect = (index: number) => {
    setCurrentLineIndex(index);
  };

  return (
    <div className="flex h-screen flex-col bg-scaffold">
      {/* Player + back button overlay */}
      <div className="relative shrink-0">
        {playLine ? (
          <VideoPlayer url={playLine.url} />
        ) : (
          <div className="w-full bg-black" style={{ aspectRatio: "3/2" }} />
        )}
        <button
          onClick={() => router.back()}
          className="absolute left-3 top-3 z-10"
        >
          <ChevronLeft size={24} color="white" />
        </button>
      </div>

      {/* Tab bar */}
      <DetailTabBar
        selectedIndex={selectedTab}
        onSelect={setSelectedTab}
        onSwitchLine={() => setShowLineSwitch(true)}
      />

      {/* Scrollable content */}
      <div className="relative flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto" style={{ paddingBottom: 56 }}>
          {selectedTab === 0 && (
            <VideoTabContent
              movie={store.movie}
              episodes={store.episodes}
              currentEpisodeId={currentEpisode?.id}
              onEpisodeSelect={handleEpisodeSelect}
              recommendedMovies={store.recommendedMovies}
              onRefreshRecommended={() => store.refreshRecommended()}
              marqueeTexts={appConfigStore.marqueeTexts}
            />
          )}
          {selectedTab === 1 && (
            <CommentsTabContent
              comments={store.comments}
              isLoading={store.isLoadingComments}
              hasMore={store.hasMoreComments}
              isSubmitting={store.isSubmittingComment}
              onLoadMore={() => store.loadMoreComments()}
              onSubmit={(content) => store.submitComment(content)}
              onToggleLike={(commentId) => store.toggleCommentLike(commentId)}
            />
          )}
          {selectedTab === 2 && (
            <IntroTabContent movie={store.movie} />
          )}
        </div>
      </div>

      {/* Line switch overlay (fixed, covers entire viewport including bottom bar) */}
      <LineSwitchOverlay
        visible={showLineSwitch}
        episodes={store.episodes}
        currentEpisodeIndex={currentEpisodeIndex}
        currentLineIndex={currentLineIndex}
        lines={currentLines}
        isAscending={isAscending}
        isOngoing={store.movie.status === MovieStatus.Ongoing}
        onEpisodeSelect={handleEpisodeIndexSelect}
        onLineSelect={handleLineSelect}
        onSortToggle={() => setIsAscending(!isAscending)}
        onClose={() => setShowLineSwitch(false)}
      />

      {/* Fixed bottom bar */}
      <VideoBottomBar
        movieId={id}
        isFavorited={store.isFavorited}
        isSubscribed={store.isSubscribed}
        isFavoriting={store.isFavoriting}
        isSubscribing={store.isSubscribing}
        onToggleFavorite={() => store.toggleFavorite()}
        onToggleSubscribe={() => store.toggleSubscribe()}
      />
    </div>
  );
});

export default MovieDetailPage;
