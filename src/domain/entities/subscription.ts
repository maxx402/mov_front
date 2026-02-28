export interface Subscription {
  readonly id: string;
  readonly movieId: string;
  readonly movieTitle: string;
  readonly movieCover: string;
  readonly status?: string;
  readonly currentEpisode?: string;
  readonly notifyUpdate: boolean;
  readonly createdAt: string;
}
