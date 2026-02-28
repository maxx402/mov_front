"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { IFeedbackRepository } from "@/domain/repositories/feedback-repository";
import type { FeedbackRecord } from "@/domain/entities/feedback";
import { getFeedbackStatusText } from "@/domain/entities/feedback";
import { AuthGuard } from "@/components/common/auth-guard";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { EmptyState } from "@/components/common/empty-state";

function FeedbackListContent() {
  const router = useRouter();
  const container = useContainer();
  const feedbackRepo = useMemo(() => container.get<IFeedbackRepository>(DI_KEYS.FeedbackRepository), [container]);

  const [items, setItems] = useState<FeedbackRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const result = await feedbackRepo.getMyFeedbacks();
      result.fold(
        () => {},
        (data) => setItems(data),
      );
      setIsLoading(false);
    };
    load();
  }, [feedbackRepo]);

  const getStatusColor = (status: number): string => {
    switch (status) {
      case 1: return "#4CAF50"; // replied - green
      case 2: return "rgba(255,255,255,0.4)"; // closed - grey
      default: return "#FFE5B4"; // pending - gold
    }
  };

  const formatTime = (dateStr: string): string => {
    const d = new Date(dateStr);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    const hour = d.getHours().toString().padStart(2, "0");
    const minute = d.getMinutes().toString().padStart(2, "0");
    return `${month}-${day} ${hour}:${minute}`;
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
          反馈记录
        </span>
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner text="加载中..." />
      ) : items.length === 0 ? (
        <EmptyState text="暂无反馈记录" />
      ) : (
        <div className="flex-1 overflow-y-auto">
          {items.map((item) => {
            const statusText = getFeedbackStatusText(item);
            const statusColor = getStatusColor(item.status);
            return (
              <button
                key={item.id}
                onClick={() => router.push(`/feedback/${item.id}`)}
                className="flex w-full flex-col text-left"
                style={{
                  padding: "14px 16px",
                  borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex w-full items-center justify-between">
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}>
                    {item.typeName}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: statusColor,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: `${statusColor}1A`,
                    }}
                  >
                    {statusText}
                  </span>
                </div>
                <p
                  className="mt-1.5 line-clamp-2"
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: "18px" }}
                >
                  {item.content}
                </p>
                <span className="mt-1.5" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                  {formatTime(item.createdAt)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function FeedbackListPage() {
  return (
    <AuthGuard>
      <FeedbackListContent />
    </AuthGuard>
  );
}
