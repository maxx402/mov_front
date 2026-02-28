import type { Result } from "@/core/errors/result";
import type { FeedbackTypeInfo, FeedbackRecord, FeedbackDetail } from "@/domain/entities/feedback";

export interface IFeedbackRepository {
  getFeedbackTypes(): Promise<FeedbackTypeInfo[]>;
  getMyFeedbacks(params?: { page?: number; first?: number }): Promise<Result<FeedbackRecord[]>>;
  getFeedbackDetail(id: string): Promise<Result<FeedbackDetail>>;
  createFeedbackComment(params: { feedbackId: string; content: string }): Promise<Result<void>>;
  createFeedback(params: {
    feedbackTypeId: string;
    content: string;
    imageIds?: string[];
    videoId?: string;
    movieId?: string;
    playLineId?: string;
    playUrl?: string;
    deviceInfo?: string;
    appVersion?: string;
  }): Promise<Result<void>>;
}
