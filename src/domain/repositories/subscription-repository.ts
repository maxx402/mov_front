import type { Result } from "@/core/errors/result";
import type { Subscription } from "@/domain/entities/subscription";
import type { PaginatedList } from "@/domain/entities/paginator";

export interface ISubscriptionRepository {
  getSubscriptions(params?: { page?: number; pageSize?: number }): Promise<Result<PaginatedList<Subscription>>>;
  addSubscription(params: { movieId: string; notifyUpdate?: boolean }): Promise<Result<Subscription>>;
  removeSubscription(movieId: string): Promise<Result<boolean>>;
  removeSubscriptions(movieIds: string[]): Promise<Result<boolean>>;
  updateSubscription(params: { movieId: string; notifyUpdate: boolean }): Promise<Result<Subscription>>;
}
