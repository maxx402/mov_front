import type { Comment, CommentReply } from "@/domain/entities/comment";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapComment(data: any): Comment {
  const replyTo: CommentReply | undefined = data.replyToComment
    ? {
        commentId: data.replyToComment.id,
        userName: data.replyToComment.user?.name ?? "",
      }
    : undefined;

  return {
    id: data.id,
    userId: data.user?.id ?? "",
    userName: data.user?.name ?? "",
    userAvatar: data.user?.avatar ?? undefined,
    content: data.content,
    likeCount: data.statistics?.like_count ?? 0,
    replyCount: data.statistics?.reply_count ?? 0,
    isLiked: data.liked ?? false,
    isTop: data.is_top ?? false,
    replyTo,
    createdAt: data.created_at,
  };
}
