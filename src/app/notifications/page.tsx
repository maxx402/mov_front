"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { INotificationRepository } from "@/domain/repositories/notification-repository";
import type { AppNotification } from "@/domain/entities/notification";
import { isNotificationUnread } from "@/domain/entities/notification";
import { AuthGuard } from "@/components/common/auth-guard";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { EmptyState } from "@/components/common/empty-state";

function NotificationsContent() {
  const router = useRouter();
  const container = useContainer();
  const notifRepo = useMemo(() => container.get<INotificationRepository>(DI_KEYS.NotificationRepository), [container]);

  const [items, setItems] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageRef = useRef(1);

  const loadItems = useCallback(async (page: number) => {
    return notifRepo.getNotifications({ page, pageSize: 20 });
  }, [notifRepo]);

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

  const markAllRead = async () => {
    await notifRepo.markAllAsRead();
    setItems((prev) =>
      prev.map((item) => ({ ...item, readAt: item.readAt ?? new Date().toISOString() })),
    );
  };

  const formatTime = (dateStr: string): string => {
    const d = new Date(dateStr);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    const hour = d.getHours().toString().padStart(2, "0");
    const minute = d.getMinutes().toString().padStart(2, "0");
    return `${month}-${day} ${hour}:${minute}`;
  };

  const hasUnread = items.some(isNotificationUnread);

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
          通知
        </span>
        {hasUnread ? (
          <button
            onClick={markAllRead}
            style={{ height: 42, padding: "0 14px", fontSize: 13, color: "#FFE5B4" }}
          >
            全部已读
          </button>
        ) : (
          <div style={{ width: 60 }} />
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner text="加载中..." />
      ) : items.length === 0 ? (
        <EmptyState text="暂无通知" />
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
          {items.map((item) => {
            const unread = isNotificationUnread(item);
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (unread) {
                    notifRepo.markAsRead(item.id);
                    setItems((prev) =>
                      prev.map((n) => n.id === item.id ? { ...n, readAt: new Date().toISOString() } : n),
                    );
                  }
                  router.push(`/notifications/${item.id}`);
                }}
                className="flex w-full items-start text-left"
                style={{
                  padding: "14px 12px",
                  borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Unread dot */}
                <div className="mr-2 mt-1.5 shrink-0" style={{ width: 8, height: 8 }}>
                  {unread && (
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F84048" }} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="truncate"
                      style={{
                        fontSize: 15,
                        fontWeight: unread ? 600 : 400,
                        color: "#FFFFFF",
                      }}
                    >
                      {item.title}
                    </span>
                    <span className="ml-2 shrink-0" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                      {formatTime(item.createdAt)}
                    </span>
                  </div>
                  {item.content && (
                    <p
                      className="mt-1 line-clamp-2"
                      style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: "18px" }}
                    >
                      {item.content}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
          {isLoadingMore && <LoadingSpinner />}
        </div>
      )}
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <AuthGuard>
      <NotificationsContent />
    </AuthGuard>
  );
}
