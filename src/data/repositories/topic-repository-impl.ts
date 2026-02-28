import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { ITopicRepository } from "@/domain/repositories/topic-repository";
import type { Topic, TopicGroup } from "@/domain/entities/topic";
import type { PaginatedList } from "@/domain/entities/paginator";
import { mapPaginatedList } from "@/data/mappers/paginator-mapper";
import { TopicGroupsDocument, TopicsDocument } from "@/data/graphql/__generated__/graphql";

function mapTopic(data: any): Topic {
  return {
    id: data.id,
    name: data.name,
    cover: data.cover ?? undefined,
    description: data.description ?? undefined,
    movieCount: data.movie_count ?? data.statistics?.movie_count ?? 0,
  };
}

function mapTopicGroup(data: any): TopicGroup {
  return {
    id: data.id,
    name: data.name,
    topics: (data.topics?.data ?? data.topics ?? []).map(mapTopic),
  };
}

export class TopicRepositoryImpl implements ITopicRepository {
  constructor(private readonly client: ApolloClient) {}

  async getTopicGroups(params?: { page?: number; pageSize?: number }): Promise<Result<PaginatedList<TopicGroup>>> {
    try {
      const { data } = await this.client.query({
        query: TopicGroupsDocument,
        variables: { page: params?.page ?? 1, first: params?.pageSize ?? 10, topicsFirst: 10 },
      });
      return Result.success(mapPaginatedList(data!.topicGroups, mapTopicGroup));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getTopics(params?: { groupId?: string; page?: number; pageSize?: number }): Promise<Result<PaginatedList<Topic>>> {
    try {
      const { data } = await this.client.query({
        query: TopicsDocument,
        variables: { groupId: params?.groupId, page: params?.page ?? 1, first: params?.pageSize ?? 20 },
      });
      return Result.success(mapPaginatedList(data!.topics, mapTopic));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
