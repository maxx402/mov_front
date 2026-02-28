import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { IMovieRequestRepository } from "@/domain/repositories/movie-request-repository";
import type { MovieRequest } from "@/domain/entities/movie-request";
import { MovieRequestStatus } from "@/domain/entities/movie-request";
import { CreateMovieRequestDocument } from "@/data/graphql/__generated__/graphql";

// Note: The GraphQL schema uses `admin_reply` field name, and status is integer
function mapMovieRequestStatus(value: number): MovieRequestStatus {
  switch (value) {
    case 1: return MovieRequestStatus.Accepted;
    case 2: return MovieRequestStatus.Rejected;
    default: return MovieRequestStatus.Pending;
  }
}

export class MovieRequestRepositoryImpl implements IMovieRequestRepository {
  constructor(private readonly client: ApolloClient) {}

  async createMovieRequest(content: string): Promise<Result<MovieRequest>> {
    try {
      const { data } = await this.client.mutate({
        mutation: CreateMovieRequestDocument,
        variables: { content },
      });
      const r = data!.createMovieRequest!;
      return Result.success({
        id: r.id,
        content: r.content,
        status: mapMovieRequestStatus(r.status),
        reply: r.admin_reply ?? undefined,
        createdAt: r.created_at,
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
