import type { Result } from "@/core/errors/result";
import type { Comment } from "@/domain/entities/comment";
import type { PaginatedList } from "@/domain/entities/paginator";

export interface ICommentRepository {
  getComments(params: {
    targetType: string;
    targetId: string;
    parentId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Comment>>>;
  createComment(params: {
    targetType: string;
    targetId: string;
    content: string;
    parentId?: string;
    replyToCommentId?: string;
  }): Promise<Result<Comment>>;
  deleteComment(id: string): Promise<Result<boolean>>;
  likeComment(commentId: string): Promise<Result<boolean>>;
  unlikeComment(commentId: string): Promise<Result<boolean>>;
}
