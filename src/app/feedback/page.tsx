"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { IFeedbackRepository } from "@/domain/repositories/feedback-repository";
import type { FeedbackTypeInfo } from "@/domain/entities/feedback";
import { AuthGuard } from "@/components/common/auth-guard";
import { LoadingSpinner } from "@/components/common/loading-spinner";

function FeedbackContent() {
  const router = useRouter();
  const container = useContainer();
  const feedbackRepo = useMemo(() => container.get<IFeedbackRepository>(DI_KEYS.FeedbackRepository), [container]);

  const [types, setTypes] = useState<FeedbackTypeInfo[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<string>("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);

  const maxLength = 500;

  useEffect(() => {
    const load = async () => {
      const result = await feedbackRepo.getFeedbackTypes();
      setTypes(result);
      if (result.length > 0) {
        setSelectedTypeId(result[0].id);
      }
      setIsLoadingTypes(false);
    };
    load();
  }, [feedbackRepo]);

  const handleSubmit = async () => {
    if (!selectedTypeId || !content.trim()) return;
    setIsSubmitting(true);
    await feedbackRepo.createFeedback({
      feedbackTypeId: selectedTypeId,
      content: content.trim(),
    });
    setIsSubmitting(false);
    router.back();
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
        <span className="flex-1 text-center" style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF" }}>
          提交反馈
        </span>
        <button
          onClick={() => router.push("/feedback/list")}
          style={{ height: 42, padding: "0 14px", fontSize: 13, color: "#FFE5B4" }}
        >
          反馈记录
        </button>
      </div>

      {/* Content */}
      {isLoadingTypes ? (
        <LoadingSpinner text="加载中..." />
      ) : (
        <div className="flex-1 overflow-y-auto" style={{ padding: "20px 16px" }}>
          {/* Type selector */}
          <span style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>反馈类型</span>
          <div className="mt-3 flex flex-wrap" style={{ gap: 8 }}>
            {types.map((type) => {
              const isSelected = type.id === selectedTypeId;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedTypeId(type.id)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 4,
                    background: isSelected ? "#FFE5B4" : "rgba(255,255,255,0.08)",
                    fontSize: 13,
                    fontWeight: 500,
                    color: isSelected ? "#1A1A1A" : "rgba(255,255,255,0.8)",
                  }}
                >
                  {type.name}
                </button>
              );
            })}
          </div>

          {/* Text input */}
          <div className="mt-6">
            <span style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>反馈内容</span>
            <div className="relative mt-3">
              <textarea
                value={content}
                onChange={(e) => {
                  if (e.target.value.length <= maxLength) {
                    setContent(e.target.value);
                  }
                }}
                placeholder="请描述您遇到的问题或建议..."
                style={{
                  width: "100%",
                  height: 140,
                  padding: 12,
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.05)",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  fontSize: 14,
                  color: "#FFFFFF",
                  resize: "none",
                  outline: "none",
                }}
              />
              <span
                className="absolute bottom-3 right-3"
                style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}
              >
                {content.length}/{maxLength}
              </span>
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim() || !selectedTypeId}
            className="mt-8 flex w-full items-center justify-center"
            style={{
              height: 46,
              borderRadius: 23,
              background: content.trim() && selectedTypeId
                ? "linear-gradient(135deg, #FFE5B4, #FFC65C)"
                : "rgba(255,255,255,0.1)",
              opacity: isSubmitting ? 0.5 : 1,
            }}
          >
            <span style={{
              fontSize: 16,
              fontWeight: 600,
              color: content.trim() && selectedTypeId ? "#1A1A1A" : "rgba(255,255,255,0.3)",
            }}>
              {isSubmitting ? "提交中..." : "提交反馈"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <AuthGuard>
      <FeedbackContent />
    </AuthGuard>
  );
}
