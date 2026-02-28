import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { ICommentRepository } from "@/domain/repositories/comment-repository";
import type { Comment } from "@/domain/entities/comment";
import type { PaginatedList } from "@/domain/entities/paginator";
import { mapComment } from "@/data/mappers/comment-mapper";
import { mapPaginatedList } from "@/data/mappers/paginator-mapper";
import {
  MovieCommentsDocument,
  CommentRepliesDocument,
  CreateMovieCommentDocument,
  DeleteCommentDocument,
  LikeCommentDocument,
  UnlikeCommentDocument,
} from "@/data/graphql/__generated__/graphql";

export class CommentRepositoryImpl implements ICommentRepository {
  constructor(private readonly client: ApolloClient) {}

  async getComments(params: {
    targetType: string;
    targetId: string;
    parentId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Comment>>> {
    try {
      if (params.parentId) {
        const { data } = await this.client.query({
          query: CommentRepliesDocument,
          variables: { parentId: params.parentId, page: params.page ?? 1, first: params.pageSize ?? 20 },
        });
        return Result.success(mapPaginatedList(data!.commentReplies, mapComment));
      }
      const { data } = await this.client.query({
        query: MovieCommentsDocument,
        variables: { movieId: params.targetId, page: params.page ?? 1, first: params.pageSize ?? 20 },
      });
      return Result.success(mapPaginatedList(data!.movieComments, mapComment));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async createComment(params: {
    targetType: string;
    targetId: string;
    content: string;
    parentId?: string;
    replyToCommentId?: string;
  }): Promise<Result<Comment>> {
    try {
      const { data } = await this.client.mutate({
        mutation: CreateMovieCommentDocument,
        variables: {
          input: {
            movie_id: params.targetId,
            content: params.content,
            parent_id: params.parentId,
            reply_to_comment_id: params.replyToCommentId,
          },
        },
      });
      return Result.success(mapComment(data!.createMovieComment));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async deleteComment(id: string): Promise<Result<boolean>> {
    try {
      await this.client.mutate({ mutation: DeleteCommentDocument, variables: { id } });
      return Result.success(true);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async likeComment(commentId: string): Promise<Result<boolean>> {
    try {
      await this.client.mutate({ mutation: LikeCommentDocument, variables: { commentId } });
      return Result.success(true);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async unlikeComment(commentId: string): Promise<Result<boolean>> {
    try {
      await this.client.mutate({ mutation: UnlikeCommentDocument, variables: { commentId } });
      return Result.success(true);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
