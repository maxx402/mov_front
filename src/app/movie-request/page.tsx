"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { IMovieRequestRepository } from "@/domain/repositories/movie-request-repository";
import { AuthGuard } from "@/components/common/auth-guard";

function MovieRequestContent() {
  const router = useRouter();
  const container = useContainer();
  const movieRequestRepo = useMemo(
    () => container.get<IMovieRequestRepository>(DI_KEYS.MovieRequestRepository),
    [container],
  );

  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxLength = 500;

  const handleSubmit = async () => {
    if (!content.trim() || isSubmitting) return;
    setIsSubmitting(true);
    const result = await movieRequestRepo.createMovieRequest(content.trim());
    result.fold(
      () => {
        setIsSubmitting(false);
      },
      () => {
        router.back();
      },
    );
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
          我要求片
        </span>
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "20px 16px" }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF" }}>影片描述</span>

        <div className="relative mt-3">
          <textarea
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setContent(e.target.value);
              }
            }}
            placeholder="请输入您想看的影片名称或描述..."
            style={{
              width: "100%",
              height: 140,
              padding: 12,
              borderRadius: 5,
              background: "rgba(26,26,26,0.65)",
              border: "0.5px solid rgba(255,255,255,0.5)",
              fontSize: 14,
              color: "#FFFFFF",
              lineHeight: "26px",
              resize: "none",
              outline: "none",
            }}
          />
          <span
            className="absolute bottom-3 right-3"
            style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}
          >
            {content.length}/{maxLength}
          </span>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !content.trim()}
          className="mt-8 flex w-full items-center justify-center"
          style={{
            height: 46,
            borderRadius: 23,
            background: content.trim()
              ? "linear-gradient(135deg, #FFE5B4, #FFC65C)"
              : "rgba(255,255,255,0.1)",
            opacity: isSubmitting ? 0.5 : 1,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: content.trim() ? "#1A1A1A" : "rgba(255,255,255,0.3)",
            }}
          >
            {isSubmitting ? "提交中..." : "提交"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function MovieRequestPage() {
  return (
    <AuthGuard>
      <MovieRequestContent />
    </AuthGuard>
  );
}
