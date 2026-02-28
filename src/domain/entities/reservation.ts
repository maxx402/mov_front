export enum ReservationStatus {
  Upcoming = "upcoming",
  Released = "released",
}

export interface Reservation {
  readonly id: string;
  readonly movieId: string;
  readonly movieTitle: string;
  readonly movieCover: string;
  readonly releaseDate?: string;
  readonly status: ReservationStatus;
  readonly createdAt: string;
}

export function isReservationUpcoming(reservation: Reservation): boolean {
  return reservation.status === ReservationStatus.Upcoming;
}

export function isReservationReleased(reservation: Reservation): boolean {
  return reservation.status === ReservationStatus.Released;
}

export function getReservationReleaseDateText(reservation: Reservation): string {
  if (!reservation.releaseDate) return "";
  const date = new Date(reservation.releaseDate);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}
