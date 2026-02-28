import type { Result } from "@/core/errors/result";
import type { Reservation, ReservationStatus } from "@/domain/entities/reservation";
import type { PaginatedList } from "@/domain/entities/paginator";

export interface IReservationRepository {
  getReservations(params?: {
    status?: ReservationStatus;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Reservation>>>;
  addReservation(movieId: string): Promise<Result<Reservation>>;
  removeReservation(movieId: string): Promise<Result<boolean>>;
  removeReservations(movieIds: string[]): Promise<Result<boolean>>;
}
