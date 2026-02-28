"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { IFeedbackRepository } from "@/domain/repositories/feedback-repository";
import type { FeedbackDetail } from "@/domain/entities/feedback";
import { AuthGuard } from "@/components/common/auth-guard";
import { OptimizedImage } from "@/components/common/optimized-image";
import { LoadingSpinner } from "@/components/common/loading-spinner";

interface Props {
  params: Promise<{ id: string }>;
}

function FeedbackDetailContent({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const container = useContainer();
  const feedbackRepo = useMemo(() => container.get<IFeedbackRepository>(DI_KEYS.FeedbackRepository), [container]);

  const [detail, setDetail] = useState<FeedbackDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      const result = await feedbackRepo.getFeedbackDetail(id);
      result.fold(
        () => {},
        (data) => setDetail(data),
      );
      setIsLoading(false);
    };
    load();
  }, [feedbackRepo, id]);

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) return;
    setIsSubmitting(true);
    await feedbackRepo.createFeedbackComment({ feedbackId: id, content: replyContent.trim() });
    // Refresh detail
    const result = await feedbackRepo.getFeedbackDetail(id);
    result.fold(
      () => {},
      (data) => setDetail(data),
    );
    setReplyContent("");
    setIsSubmitting(false);
  };

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
          反馈详情
        </span>
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner text="加载中..." />
      ) : !detail ? (
        <div className="flex flex-1 items-center justify-center">
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>反馈不存在</span>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto" style={{ padding: "20px 16px" }}>
            {/* Type & time */}
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 14, fontWeight: 500, color: "#FFE5B4" }}>
                {detail.typeName}
              </span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                {formatTime(detail.createdAt)}
              </span>
            </div>

            {/* Content */}
            <p
              className="mt-3"
              style={{ fontSize: 15, color: "#FFFFFF", lineHeight: "22px", whiteSpace: "pre-wrap" }}
            >
              {detail.content}
            </p>

            {/* Images */}
            {detail.imageUrls.length > 0 && (
              <div className="mt-4 flex flex-wrap" style={{ gap: 8 }}>
                {detail.imageUrls.map((url, i) => (
                  <OptimizedImage key={i} src={url} alt="" width={100} height={100} rounded="rounded-[4px]" />
                ))}
              </div>
            )}

            {/* Comments / replies */}
            {detail.comments.length > 0 && (
              <div className="mt-6">
                <div style={{ height: 0.5, background: "rgba(255,255,255,0.1)", marginBottom: 16 }} />
                {detail.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="mb-4"
                    style={{
                      padding: 12,
                      borderRadius: 8,
                      background: comment.isOfficial ? "rgba(255,229,180,0.08)" : "rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: comment.isOfficial ? "#FFE5B4" : "#FFFFFF",
                      }}>
                        {comment.isOfficial ? "官方回复" : comment.userName}
                      </span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                        {formatTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2" style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: "20px" }}>
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reply input */}
          <div
            className="flex shrink-0 items-center"
            style={{
              padding: "8px 16px",
              borderTop: "0.5px solid rgba(255,255,255,0.1)",
              background: "#1A1A1A",
              gap: 8,
            }}
          >
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="回复..."
              style={{
                flex: 1,
                height: 36,
                padding: "0 12px",
                borderRadius: 18,
                background: "rgba(255,255,255,0.08)",
                border: "none",
                outline: "none",
                fontSize: 14,
                color: "#FFFFFF",
              }}
            />
            <button
              onClick={handleSubmitReply}
              disabled={!replyContent.trim() || isSubmitting}
              style={{
                height: 36,
                padding: "0 16px",
                borderRadius: 18,
                background: replyContent.trim() ? "#FFE5B4" : "rgba(255,255,255,0.1)",
                fontSize: 14,
                fontWeight: 500,
                color: replyContent.trim() ? "#1A1A1A" : "rgba(255,255,255,0.3)",
              }}
            >
              发送
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function FeedbackDetailPage({ params }: Props) {
  return (
    <AuthGuard>
      <FeedbackDetailContent params={params} />
    </AuthGuard>
  );
}
