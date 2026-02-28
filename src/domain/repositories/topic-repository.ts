import type { Result } from "@/core/errors/result";
import type { Topic, TopicGroup } from "@/domain/entities/topic";
import type { PaginatedList } from "@/domain/entities/paginator";

export interface ITopicRepository {
  getTopicGroups(params?: { page?: number; pageSize?: number }): Promise<Result<PaginatedList<TopicGroup>>>;
  getTopics(params?: { groupId?: string; page?: number; pageSize?: number }): Promise<Result<PaginatedList<Topic>>>;
}
