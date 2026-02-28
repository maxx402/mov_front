import { describe, it, expect } from "vitest";
import { mapPaginatorInfo, mapPaginatedList } from "../paginator-mapper";

describe("mapPaginatorInfo", () => {
  it("returns defaults when all fields are missing", () => {
    const result = mapPaginatorInfo({});

    expect(result).toEqual({
      currentPage: 1,
      lastPage: 1,
      hasMorePages: false,
      total: 0,
    });
  });

  it("passes through provided values", () => {
    const result = mapPaginatorInfo({
      currentPage: 3,
      lastPage: 10,
      hasMorePages: true,
      total: 100,
    });

    expect(result).toEqual({
      currentPage: 3,
      lastPage: 10,
      hasMorePages: true,
      total: 100,
    });
  });

  it("applies defaults only for missing fields", () => {
    const result = mapPaginatorInfo({ currentPage: 5, total: 50 });

    expect(result).toEqual({
      currentPage: 5,
      lastPage: 1,
      hasMorePages: false,
      total: 50,
    });
  });
});

describe("mapPaginatedList", () => {
  it("maps items using the provided mapItem function", () => {
    const raw = {
      data: [{ value: 1 }, { value: 2 }, { value: 3 }] as const,
      paginatorInfo: { currentPage: 1, lastPage: 2, hasMorePages: true, total: 6 },
    };

    const result = mapPaginatedList(raw, (item) => item.value * 10);

    expect(result.items).toEqual([10, 20, 30]);
    expect(result.paginator).toEqual({
      currentPage: 1,
      lastPage: 2,
      hasMorePages: true,
      total: 6,
    });
  });

  it("returns empty items for empty data array", () => {
    const raw = {
      data: [] as readonly never[],
      paginatorInfo: {},
    };

    const result = mapPaginatedList(raw, (item) => item);

    expect(result.items).toEqual([]);
    expect(result.paginator).toEqual({
      currentPage: 1,
      lastPage: 1,
      hasMorePages: false,
      total: 0,
    });
  });

  it("transforms each item through the mapper", () => {
    const raw = {
      data: [
        { name: "alice" },
        { name: "bob" },
      ],
      paginatorInfo: { currentPage: 2, total: 10 },
    };

    const result = mapPaginatedList(raw, (item) => item.name.toUpperCase());

    expect(result.items).toEqual(["ALICE", "BOB"]);
    expect(result.paginator.currentPage).toBe(2);
    expect(result.paginator.total).toBe(10);
  });
});
