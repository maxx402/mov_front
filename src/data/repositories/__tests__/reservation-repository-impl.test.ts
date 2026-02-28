import { describe, it, expect, vi, beforeEach } from "vitest";
import { ReservationRepositoryImpl } from "../reservation-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  MyReservationsDocument: { kind: "Document" },
  AddReservationDocument: { kind: "Document" },
  ReservationStatus: { Upcoming: "UPCOMING", Released: "RELEASED" },
}));

vi.mock("@/data/mappers/paginator-mapper", () => ({
  mapPaginatedList: (d: any, fn: any) => ({
    items: d.data.map(fn),
    paginator: { currentPage: 1, lastPage: 1, hasMorePages: false, total: d.data.length },
  }),
}));

function createMockClient() {
  return { query: vi.fn(), mutate: vi.fn() } as any;
}

describe("ReservationRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: ReservationRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new ReservationRepositoryImpl(client);
  });

  describe("getReservations", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({
        data: { myReservations: { data: [{ id: "1", movie_id: "m1", created_at: "2024-01-01", movie: { id: "m1", title: "M" } }], paginatorInfo: {} } },
      });
      const result = await repo.getReservations();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getReservations();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("addReservation", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({
        data: { addReservation: { id: "1", movie_id: "m1", created_at: "2024-01-01", movie: { id: "m1", title: "M" } } },
      });
      const result = await repo.addReservation("m1");
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.mutate.mockRejectedValue(new Error("fail"));
      const result = await repo.addReservation("m1");
      expect(result.isFailure).toBe(true);
    });
  });

  describe("removeReservation", () => {
    it("always returns failure (not supported)", async () => {
      const result = await repo.removeReservation("m1");
      expect(result.isFailure).toBe(true);
      expect(result.error!.message).toContain("not supported");
    });
  });

  describe("removeReservations", () => {
    it("always returns failure (not supported)", async () => {
      const result = await repo.removeReservations(["m1"]);
      expect(result.isFailure).toBe(true);
      expect(result.error!.message).toContain("not supported");
    });
  });
});
