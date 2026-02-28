export interface Favorite {
  readonly id: string;
  readonly movieId: string;
  readonly movieTitle: string;
  readonly movieCover: string;
  readonly status?: string;
  readonly createdAt: string;
}
