"use client";

import { useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { CommentItem } from "./comment-item";
import { InfiniteList } from "@/components/common/infinite-list";
import { EmptyState } from "@/components/common/empty-state";
import { useUserStore } from "@/stores/use-store";
import { useToast } from "@/components/common/toast";
import type { Comment } from "@/domain/entities/comment";

interface Props {
  comments: readonly Comment[];
  isLoading: boolean;
  hasMore: boolean;
  isSubmitting: boolean;
  onLoadMore: () => void;
  onSubmit: (content: string) => Promise<string | null>;
  onToggleLike: (commentId: string) => void;
}

export const CommentsTabContent = observer(function CommentsTabContent({
  comments,
  isLoading,
  hasMore,
  isSubmitting,
  onLoadMore,
  onSubmit,
  onToggleLike,
}: Props) {
  const userStore = useUserStore();
  const toast = useToast();
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!inputValue.trim()) return;
    if (!userStore.isAuthenticated) {
      userStore.openLoginSheet();
      return;
    }
    const error = await onSubmit(inputValue.trim());
    if (error) {
      toast.show(error, "error");
    } else {
      setInputValue("");
      setIsFocused(false);
    }
  }, [inputValue, onSubmit, userStore, toast]);

  const handleInputFocus = () => {
    if (!userStore.isAuthenticated) {
      userStore.openLoginSheet();
      return;
    }
    setIsFocused(true);
  };

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 250px)" }}>
      {/* Comment list */}
      <div className="flex-1">
        {comments.length === 0 && !isLoading ? (
          <EmptyState text="暂无评论，快来抢沙发吧" />
        ) : (
          <InfiniteList
            onLoadMore={onLoadMore}
            hasMore={hasMore}
            isLoading={isLoading}
          >
            <div>
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onToggleLike={() => onToggleLike(comment.id)}
                />
              ))}
            </div>
          </InfiniteList>
        )}
      </div>

      {/* Comment input bar */}
      <div
        className="sticky bottom-14 left-0 right-0 bg-scaffold"
        style={{ padding: "8px 12px", borderTop: "0.5px solid rgba(255, 255, 255, 0.1)" }}
      >
        {isFocused ? (
          <div className="flex items-center" style={{ gap: 8 }}>
            <input
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              onBlur={() => {
                if (!inputValue) setIsFocused(false);
              }}
              placeholder={
                userStore.isAuthenticated
                  ? "你的支持是我们前进的动力"
                  : "登录后可发表评论"
              }
              className="flex-1"
              style={{
                height: 38,
                borderRadius: 19,
                background: "rgba(255, 255, 255, 0.08)",
                padding: "0 12px",
                fontSize: 13,
                color: "#FFFFFF",
                border: "none",
                outline: "none",
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !inputValue.trim()}
              style={{
                width: 50,
                height: 26,
                borderRadius: 4,
                background: "linear-gradient(135deg, #F9315C, #F64E36)",
                fontSize: 13,
                fontWeight: 700,
                color: "#FFFFFF",
                opacity: inputValue.trim() ? 1 : 0.5,
              }}
            >
              发送
            </button>
          </div>
        ) : (
          <button
            onClick={handleInputFocus}
            className="flex w-full items-center"
            style={{
              height: 38,
              borderRadius: 19,
              background: "rgba(255, 255, 255, 0.08)",
              padding: "0 12px",
            }}
          >
            <Image
              src="/images/ic_cmt_send.webp"
              alt=""
              width={16}
              height={16}
            />
            <span
              className="ml-2"
              style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.4)" }}
            >
              {userStore.isAuthenticated
                ? "你的支持是我们前进的动力"
                : "登录后可发表评论"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
});
