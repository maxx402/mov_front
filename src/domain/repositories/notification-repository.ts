import type { Result } from "@/core/errors/result";
import type { AppNotification } from "@/domain/entities/notification";
import type { PaginatedList } from "@/domain/entities/paginator";

export interface INotificationRepository {
  getNotifications(params?: { page?: number; pageSize?: number }): Promise<Result<PaginatedList<AppNotification>>>;
  getUnreadCount(): Promise<Result<number>>;
  markAsRead(id: string): Promise<Result<boolean>>;
  markAllAsRead(): Promise<Result<boolean>>;
}
