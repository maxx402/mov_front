export enum NotificationType {
  System = "system",
  Update = "update",
  Comment = "comment",
  Like = "like",
}

export interface AppNotification {
  readonly id: string;
  readonly title: string;
  readonly content?: string;
  readonly notifiableType?: string;
  readonly notifiableId?: string;
  readonly data?: string;
  readonly type?: string;
  readonly readAt?: string;
  readonly createdAt: string;
}

export function isNotificationRead(notification: AppNotification): boolean {
  return notification.readAt != null;
}

export function isNotificationUnread(notification: AppNotification): boolean {
  return notification.readAt == null;
}
