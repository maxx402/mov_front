import { describe, it, expect } from "vitest";
import { isMovieRequestAccepted, MovieRequestStatus } from "../movie-request";
import type { MovieRequest } from "../movie-request";

describe("isMovieRequestAccepted", () => {
  it("returns true for Accepted", () => {
    expect(isMovieRequestAccepted({ status: MovieRequestStatus.Accepted } as MovieRequest)).toBe(true);
  });
  it("returns false for Pending", () => {
    expect(isMovieRequestAccepted({ status: MovieRequestStatus.Pending } as MovieRequest)).toBe(false);
  });
  it("returns false for Rejected", () => {
    expect(isMovieRequestAccepted({ status: MovieRequestStatus.Rejected } as MovieRequest)).toBe(false);
  });
});
