import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { ISubscriptionRepository } from "@/domain/repositories/subscription-repository";
import type { Subscription } from "@/domain/entities/subscription";
import type { PaginatedList } from "@/domain/entities/paginator";
import { mapPaginatedList } from "@/data/mappers/paginator-mapper";
import {
  MySubscriptionsDocument,
  AddSubscriptionDocument,
  RemoveSubscriptionDocument,
  RemoveSubscriptionsDocument,
  UpdateSubscriptionDocument,
} from "@/data/graphql/__generated__/graphql";

function mapSubscription(data: any): Subscription {
  return {
    id: data.id,
    movieId: data.movie_id ?? data.movie?.id ?? "",
    movieTitle: data.movie?.title ?? "",
    movieCover: data.movie?.cover ?? "",
    status: data.movie?.status?.toString() ?? undefined,
    currentEpisode: data.movie?.current_episode?.toString() ?? undefined,
    notifyUpdate: data.notify_update ?? true,
    createdAt: data.created_at,
  };
}

export class SubscriptionRepositoryImpl implements ISubscriptionRepository {
  constructor(private readonly client: ApolloClient) {}

  async getSubscriptions(params?: { page?: number; pageSize?: number }): Promise<Result<PaginatedList<Subscription>>> {
    try {
      const { data } = await this.client.query({
        query: MySubscriptionsDocument,
        variables: { page: params?.page ?? 1, first: params?.pageSize ?? 20 },
      });
      return Result.success(mapPaginatedList(data!.mySubscriptions, mapSubscription));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async addSubscription(params: { movieId: string; notifyUpdate?: boolean }): Promise<Result<Subscription>> {
    try {
      const { data } = await this.client.mutate({
        mutation: AddSubscriptionDocument,
        variables: { movieId: params.movieId, notifyUpdate: params.notifyUpdate },
      });
      const r = data!.addSubscription!;
      return Result.success({
        id: r.id,
        movieId: r.movie_id!,
        movieTitle: "",
        movieCover: "",
        notifyUpdate: r.notify_update ?? true,
        createdAt: r.created_at,
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async removeSubscription(movieId: string): Promise<Result<boolean>> {
    try {
      await this.client.mutate({ mutation: RemoveSubscriptionDocument, variables: { movie_id: movieId } });
      return Result.success(true);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async removeSubscriptions(movieIds: string[]): Promise<Result<boolean>> {
    try {
      await this.client.mutate({ mutation: RemoveSubscriptionsDocument, variables: { movie_ids: movieIds } });
      return Result.success(true);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async updateSubscription(params: { movieId: string; notifyUpdate: boolean }): Promise<Result<Subscription>> {
    try {
      const { data } = await this.client.mutate({
        mutation: UpdateSubscriptionDocument,
        variables: { movieId: params.movieId, notifyUpdate: params.notifyUpdate },
      });
      const r = data!.updateSubscription!;
      return Result.success({
        id: r.id,
        movieId: r.movie_id!,
        movieTitle: "",
        movieCover: "",
        notifyUpdate: r.notify_update ?? params.notifyUpdate,
        createdAt: r.created_at,
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
