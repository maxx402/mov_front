"use client";

import { memo } from "react";
import Image from "next/image";
import { OptimizedImage } from "@/components/common/optimized-image";
import type { Comment } from "@/domain/entities/comment";

interface Props {
  comment: Comment;
  onToggleLike?: () => void;
}

export const CommentItem = memo(function CommentItem({ comment, onToggleLike }: Props) {
  const date = new Date(comment.createdAt);
  const dateStr = `${date.getMonth() + 1}-${date.getDate()}`;

  return (
    <div className="flex" style={{ padding: "12px 11px", gap: 10 }}>
      <OptimizedImage
        src={comment.userAvatar ?? ""}
        alt={comment.userName}
        width={34}
        height={34}
        rounded="rounded-full"
        style={{ width: 34, height: 34, flexShrink: 0 }}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.6)" }}>
            {comment.userName}
          </span>
          <span style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.4)" }}>
            {dateStr}
          </span>
        </div>
        <p style={{ marginTop: 4, fontSize: 12, color: "#FFFFFF", lineHeight: "18px" }}>
          {comment.content}
        </p>
        <button
          onClick={onToggleLike}
          className="mt-1.5 flex items-center"
          style={{ gap: 4 }}
        >
          <Image
            src={comment.isLiked ? "/images/ic_cmt_like_fill.webp" : "/images/ic_cmt_like.webp"}
            alt="like"
            width={14}
            height={14}
          />
          {comment.likeCount > 0 && (
            <span style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.4)" }}>
              {comment.likeCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
});
