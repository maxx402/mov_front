export enum MovieRequestStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

export interface MovieRequest {
  readonly id: string;
  readonly content: string;
  readonly status: MovieRequestStatus;
  readonly reply?: string;
  readonly createdAt: string;
}

export function isMovieRequestAccepted(request: MovieRequest): boolean {
  return request.status === MovieRequestStatus.Accepted;
}
