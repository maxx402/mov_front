"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { IFavoriteRepository } from "@/domain/repositories/favorite-repository";
import type { Favorite } from "@/domain/entities/favorite";
import { AuthGuard } from "@/components/common/auth-guard";
import { VerticalMovieCard } from "@/components/common/vertical-movie-card";
import { EditModeActionBar } from "@/components/common/edit-mode-action-bar";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { EmptyState } from "@/components/common/empty-state";

function FavoritesContent() {
  const router = useRouter();
  const container = useContainer();
  const favoriteRepo = useMemo(() => container.get<IFavoriteRepository>(DI_KEYS.FavoriteRepository), [container]);

  const [items, setItems] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageRef = useRef(1);

  // Edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  const loadItems = useCallback(async (page: number) => {
    return favoriteRepo.getFavorites({ page, pageSize: 20 });
  }, [favoriteRepo]);

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
    await favoriteRepo.removeFavorites(movieIds);
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
          我的收藏
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
        <EmptyState text="暂无收藏" />
      ) : (
        <div
          className="flex-1 overflow-y-auto"
          onScroll={(e) => {
            const el = e.currentTarget;
            if (el.scrollHeight - el.scrollTop - el.clientHeight < 200) {
              loadMore();
            }
          }}
        >
          {/* 3-column grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
              padding: "12px 12px",
            }}
          >
            {items.map((item) => (
              <VerticalMovieCard
                key={item.id}
                cover={item.movieCover}
                title={item.movieTitle}
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
            ))}
          </div>
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

export default function FavoritesPage() {
  return (
    <AuthGuard>
      <FavoritesContent />
    </AuthGuard>
  );
}
