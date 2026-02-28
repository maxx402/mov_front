"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { ISubscriptionRepository } from "@/domain/repositories/subscription-repository";
import type { Subscription } from "@/domain/entities/subscription";
import { AuthGuard } from "@/components/common/auth-guard";
import { MovieListTile } from "@/components/common/movie-list-tile";
import { EditModeActionBar } from "@/components/common/edit-mode-action-bar";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { EmptyState } from "@/components/common/empty-state";

function SubscriptionsContent() {
  const router = useRouter();
  const container = useContainer();
  const subRepo = useMemo(() => container.get<ISubscriptionRepository>(DI_KEYS.SubscriptionRepository), [container]);

  const [items, setItems] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageRef = useRef(1);

  // Edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  const loadItems = useCallback(async (page: number) => {
    return subRepo.getSubscriptions({ page, pageSize: 20 });
  }, [subRepo]);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const result = await loadItems(1);
      result.fold(
        () => {},
        (data) => {
          setItems(data.items.slice());
          setHasMore(data.paginator.hasMorePages);
        },
      );
      setIsLoading(false);
    };
    init();
  }, [loadItems]);

  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    const nextPage = pageRef.current + 1;
    const result = await loadItems(nextPage);
    result.fold(
      () => {},
      (data) => {
        setItems((prev) => [...prev, ...data.items]);
        setHasMore(data.paginator.hasMorePages);
        pageRef.current = nextPage;
      },
    );
    setIsLoadingMore(false);
  };

  const toggleSelection = (movieId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(movieId)) {
        next.delete(movieId);
      } else {
        next.add(movieId);
      }
      return next;
    });
  };

  const isAllSelected = items.length > 0 && selectedIds.size === items.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map((i) => i.movieId)));
    }
  };

  const handleDelete = async () => {
    if (selectedIds.size === 0) return;
    setIsDeleting(true);
    const movieIds = Array.from(selectedIds);
    await subRepo.removeSubscriptions(movieIds);
    setItems((prev) => prev.filter((i) => !selectedIds.has(i.movieId)));
    setSelectedIds(new Set());
    setIsDeleting(false);
    if (items.length - movieIds.length === 0) {
      setIsEditMode(false);
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
        <span style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF", flex: 1, textAlign: "center" }}>
          我的追番
        </span>
        {items.length > 0 ? (
          <button
            onClick={() => {
              setIsEditMode(!isEditMode);
              setSelectedIds(new Set());
            }}
            style={{ height: 42, padding: "0 14px", fontSize: 14, color: "#FFE5B4" }}
          >
            {isEditMode ? "取消" : "编辑"}
          </button>
        ) : (
          <div style={{ width: 60 }} />
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner text="加载中..." />
      ) : items.length === 0 ? (
        <EmptyState text="暂无追番" />
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
          {items.map((item) => (
            <div key={item.id} style={{ marginBottom: 16 }}>
              <MovieListTile
                cover={item.movieCover}
                title={item.movieTitle}
                coverWidth={160}
                coverHeight={90}
                coverRadius={6}
                statusTag={item.currentEpisode ?? undefined}
                showSelection={isEditMode}
                isSelected={selectedIds.has(item.movieId)}
                onTap={() => {
                  if (isEditMode) {
                    toggleSelection(item.movieId);
                  } else {
                    router.push(`/movie/${item.movieId}`);
                  }
                }}
              />
            </div>
          ))}
          {isLoadingMore && <LoadingSpinner />}
        </div>
      )}

      {/* Edit mode action bar */}
      {isEditMode && (
        <EditModeActionBar
          selectedCount={selectedIds.size}
          totalCount={items.length}
          isAllSelected={isAllSelected}
          onSelectAll={handleSelectAll}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}

export default function SubscriptionsPage() {
  return (
    <AuthGuard>
      <SubscriptionsContent />
    </AuthGuard>
  );
}
