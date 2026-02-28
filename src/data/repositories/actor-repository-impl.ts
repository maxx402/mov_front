import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { IActorRepository } from "@/domain/repositories/actor-repository";
import type { Actor } from "@/domain/entities/actor";
import type { PaginatedList } from "@/domain/entities/paginator";
import { mapPaginatedList } from "@/data/mappers/paginator-mapper";
import { ActorDocument, ActorsDocument } from "@/data/graphql/__generated__/graphql";

function mapActor(data: any): Actor {
  return {
    id: data.id,
    name: data.name,
    avatar: data.avatar ?? undefined,
    description: data.description ?? undefined,
    area: data.area ?? undefined,
    movieCount: data.statistics?.movie_count ?? undefined,
  };
}

export class ActorRepositoryImpl implements IActorRepository {
  constructor(private readonly client: ApolloClient) {}

  async getActor(id: string): Promise<Result<Actor>> {
    try {
      const { data } = await this.client.query({
        query: ActorDocument,
        variables: { id },
      });
      return Result.success(mapActor(data!.actor));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getActors(params?: {
    name?: string;
    area?: string;
    gender?: number;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Actor>>> {
    try {
      const { data } = await this.client.query({
        query: ActorsDocument,
        variables: { page: params?.page ?? 1, first: params?.pageSize ?? 20 },
      });
      return Result.success(mapPaginatedList(data!.actors, mapActor));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
