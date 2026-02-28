export interface CommentReply {
  readonly commentId: string;
  readonly userName: string;
}

export interface Comment {
  readonly id: string;
  readonly userId: string;
  readonly userName: string;
  readonly userAvatar?: string;
  readonly content: string;
  readonly likeCount: number;
  readonly replyCount: number;
  readonly isLiked: boolean;
  readonly isTop: boolean;
  readonly replyTo?: CommentReply;
  readonly createdAt: string;
}

export function hasCommentReplies(comment: Comment): boolean {
  return comment.replyCount > 0;
}
