import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { IFeedbackRepository } from "@/domain/repositories/feedback-repository";
import type { FeedbackTypeInfo, FeedbackRecord, FeedbackDetail } from "@/domain/entities/feedback";
import {
  FeedbackTypesDocument,
  MyFeedbacksDocument,
  FeedbackDocument,
  CreateFeedbackDocument,
  CreateFeedbackCommentDocument,
} from "@/data/graphql/__generated__/graphql";

export class FeedbackRepositoryImpl implements IFeedbackRepository {
  private cachedTypes: FeedbackTypeInfo[] | null = null;

  constructor(private readonly client: ApolloClient) {}

  async getFeedbackTypes(): Promise<FeedbackTypeInfo[]> {
    if (this.cachedTypes) return this.cachedTypes;
    try {
      const { data } = await this.client.query({ query: FeedbackTypesDocument });
      this.cachedTypes = data!.feedbackTypes.map((t: any) => ({ id: t.id, name: t.name }));
      return this.cachedTypes!;
    } catch {
      return [];
    }
  }

  async getMyFeedbacks(params?: { page?: number; first?: number }): Promise<Result<FeedbackRecord[]>> {
    try {
      const { data } = await this.client.query({
        query: MyFeedbacksDocument,
        variables: { page: params?.page ?? 1, first: params?.first ?? 20 },
      });
      const records: FeedbackRecord[] = data!.myFeedbacks.data.map((f: any) => ({
        id: f.id,
        typeName: f.feedbackType?.name ?? "",
        content: f.content,
        status: f.status ?? 0,
        createdAt: f.created_at,
      }));
      return Result.success(records);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getFeedbackDetail(id: string): Promise<Result<FeedbackDetail>> {
    try {
      const { data } = await this.client.query({
        query: FeedbackDocument,
        variables: { id },
      });
      const f = data!.feedback!;
      return Result.success({
        id: f.id,
        typeName: f.feedbackType?.name ?? "",
        content: f.content,
        status: f.status ?? 0,
        createdAt: f.created_at,
        comments: (f.comments ?? []).map((c: any) => ({
          id: c.id,
          userName: c.user?.nickname ?? c.user?.name ?? "",
          userAvatar: c.user?.avatar ?? undefined,
          content: c.content,
          createdAt: c.created_at,
          isOfficial: true,
        })),
        imageUrls: (f.images ?? []).map((i: any) => i.url),
        videoUrl: f.video?.url ?? undefined,
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async createFeedbackComment(params: { feedbackId: string; content: string }): Promise<Result<void>> {
    try {
      await this.client.mutate({
        mutation: CreateFeedbackCommentDocument,
        variables: { input: { feedback_id: params.feedbackId, content: params.content } },
      });
      return Result.success(undefined);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async createFeedback(params: {
    feedbackTypeId: string;
    content: string;
    imageIds?: string[];
    videoId?: string;
    movieId?: string;
    playLineId?: string;
    playUrl?: string;
    deviceInfo?: string;
    appVersion?: string;
  }): Promise<Result<void>> {
    try {
      await this.client.mutate({
        mutation: CreateFeedbackDocument,
        variables: {
          input: {
            feedback_type_id: params.feedbackTypeId,
            content: params.content,
            image_ids: params.imageIds,
            video_id: params.videoId,
            movie_id: params.movieId,
            play_line_id: params.playLineId,
            play_url: params.playUrl,
            device_info: params.deviceInfo,
            app_version: params.appVersion,
          },
        },
      });
      return Result.success(undefined);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
