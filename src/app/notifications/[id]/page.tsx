"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { INotificationRepository } from "@/domain/repositories/notification-repository";
import type { AppNotification } from "@/domain/entities/notification";
import { AuthGuard } from "@/components/common/auth-guard";
import { LoadingSpinner } from "@/components/common/loading-spinner";

interface Props {
  params: Promise<{ id: string }>;
}

function NotificationDetailContent({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const container = useContainer();
  const notifRepo = useMemo(() => container.get<INotificationRepository>(DI_KEYS.NotificationRepository), [container]);

  const [notification, setNotification] = useState<AppNotification | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // Mark as read
      notifRepo.markAsRead(id);
      // Load from list (notifications don't have a getById, we pass via search params)
      const result = await notifRepo.getNotifications({ page: 1, pageSize: 100 });
      result.fold(
        () => {},
        (data) => {
          const found = data.items.find((n) => n.id === id);
          if (found) setNotification(found);
        },
      );
      setIsLoading(false);
    };
    load();
  }, [notifRepo, id]);

  const formatTime = (dateStr: string): string => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex h-screen flex-col bg-scaffold">
      {/* AppBar */}
      <div
        className="flex shrink-0 items-center pt-safe"
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
        <span className="flex-1 text-center" style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF" }}>
          通知详情
        </span>
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner text="加载中..." />
      ) : !notification ? (
        <div className="flex flex-1 items-center justify-center">
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>通知不存在</span>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto" style={{ padding: "20px 16px" }}>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", lineHeight: "24px" }}>
            {notification.title}
          </h1>
          <p className="mt-2" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            {formatTime(notification.createdAt)}
          </p>
          {notification.content && (
            <p
              className="mt-4"
              style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: "22px", whiteSpace: "pre-wrap" }}
            >
              {notification.content}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function NotificationDetailPage({ params }: Props) {
  return (
    <AuthGuard>
      <NotificationDetailContent params={params} />
    </AuthGuard>
  );
}
