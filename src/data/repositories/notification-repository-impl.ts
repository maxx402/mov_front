import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { INotificationRepository } from "@/domain/repositories/notification-repository";
import type { AppNotification } from "@/domain/entities/notification";
import type { PaginatedList } from "@/domain/entities/paginator";
import { mapPaginatedList } from "@/data/mappers/paginator-mapper";
import {
  MyNotificationsDocument,
  UnreadNotificationCountDocument,
  MarkNotificationAsReadDocument,
  MarkAllNotificationsAsReadDocument,
} from "@/data/graphql/__generated__/graphql";

function mapNotification(data: any): AppNotification {
  return {
    id: data.id,
    title: data.title ?? "",
    content: data.content ?? undefined,
    notifiableType: data.notifiable_type ?? undefined,
    notifiableId: data.notifiable_id ?? undefined,
    data: data.data ?? undefined,
    type: data.type ?? undefined,
    readAt: data.read_at ?? undefined,
    createdAt: data.created_at,
  };
}

export class NotificationRepositoryImpl implements INotificationRepository {
  constructor(private readonly client: ApolloClient) {}

  async getNotifications(params?: { page?: number; pageSize?: number }): Promise<Result<PaginatedList<AppNotification>>> {
    try {
      const { data } = await this.client.query({
        query: MyNotificationsDocument,
        variables: { page: params?.page ?? 1, first: params?.pageSize ?? 20 },
        fetchPolicy: "network-only",
      });
      return Result.success(mapPaginatedList(data!.myNotifications, mapNotification));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getUnreadCount(): Promise<Result<number>> {
    try {
      const { data } = await this.client.query({ query: UnreadNotificationCountDocument, fetchPolicy: "network-only" });
      return Result.success(data!.unreadNotificationCount ?? 0);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async markAsRead(id: string): Promise<Result<boolean>> {
    try {
      await this.client.mutate({ mutation: MarkNotificationAsReadDocument, variables: { id } });
      return Result.success(true);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async markAllAsRead(): Promise<Result<boolean>> {
    try {
      await this.client.mutate({ mutation: MarkAllNotificationsAsReadDocument });
      return Result.success(true);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
