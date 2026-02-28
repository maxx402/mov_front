export enum ReportReason {
  Spam = "spam",
  Porn = "porn",
  Violence = "violence",
  Other = "other",
}

export enum ReportStatus {
  Pending = "pending",
  Handled = "handled",
  Rejected = "rejected",
}

export interface Report {
  readonly id: string;
  readonly reason: ReportReason;
  readonly description?: string;
  readonly status: ReportStatus;
  readonly createdAt: string;
}
