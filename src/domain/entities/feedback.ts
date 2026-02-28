export enum FeedbackType {
  Bug = "bug",
  Suggestion = "suggestion",
  Other = "other",
}

export enum FeedbackStatus {
  Pending = "pending",
  Replied = "replied",
  Closed = "closed",
}

export interface Feedback {
  readonly id: string;
  readonly type: FeedbackType;
  readonly content: string;
  readonly images?: readonly string[];
  readonly status: FeedbackStatus;
  readonly reply?: string;
  readonly repliedAt?: string;
  readonly createdAt: string;
}

export interface FeedbackTypeInfo {
  readonly id: string;
  readonly name: string;
}

export interface FeedbackRecord {
  readonly id: string;
  readonly typeName: string;
  readonly content: string;
  readonly status: number;
  readonly createdAt: string;
}

export interface FeedbackComment {
  readonly id: string;
  readonly userName: string;
  readonly userAvatar?: string;
  readonly content: string;
  readonly createdAt: string;
  readonly isOfficial: boolean;
}

export interface FeedbackDetail {
  readonly id: string;
  readonly typeName: string;
  readonly content: string;
  readonly status: number;
  readonly createdAt: string;
  readonly comments: readonly FeedbackComment[];
  readonly imageUrls: readonly string[];
  readonly videoUrl?: string;
}

export function isFeedbackReplied(feedback: Feedback): boolean {
  return feedback.status === FeedbackStatus.Replied;
}

export function getFeedbackStatusText(record: FeedbackRecord): string {
  switch (record.status) {
    case 1:
      return "已回复";
    case 2:
      return "已关闭";
    default:
      return "待处理";
  }
}

export function hasFeedbackOfficialReply(detail: FeedbackDetail): boolean {
  return detail.comments.some((c) => c.isOfficial);
}
