import { describe, it, expect } from "vitest";
import { isReservationUpcoming, isReservationReleased, getReservationReleaseDateText, ReservationStatus } from "../reservation";
import type { Reservation } from "../reservation";

function makeReservation(overrides: Partial<Reservation> = {}): Reservation {
  return { id: "1", movieId: "m1", movieTitle: "M", movieCover: "c.jpg", status: ReservationStatus.Upcoming, createdAt: "2024-01-01", ...overrides };
}

describe("isReservationUpcoming", () => {
  it("returns true for Upcoming", () => {
    expect(isReservationUpcoming(makeReservation())).toBe(true);
  });
  it("returns false for Released", () => {
    expect(isReservationUpcoming(makeReservation({ status: ReservationStatus.Released }))).toBe(false);
  });
});

describe("isReservationReleased", () => {
  it("returns true for Released", () => {
    expect(isReservationReleased(makeReservation({ status: ReservationStatus.Released }))).toBe(true);
  });
  it("returns false for Upcoming", () => {
    expect(isReservationReleased(makeReservation())).toBe(false);
  });
});

describe("getReservationReleaseDateText", () => {
  it("returns formatted date", () => {
    expect(getReservationReleaseDateText(makeReservation({ releaseDate: "2024-03-15" }))).toBe("3月15日");
  });
  it("returns empty string when no releaseDate", () => {
    expect(getReservationReleaseDateText(makeReservation())).toBe("");
  });
});
