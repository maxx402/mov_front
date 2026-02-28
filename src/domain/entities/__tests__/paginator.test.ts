import { describe, it, expect } from "vitest";
import {
  hasMorePages,
  getNextPage,
  isPaginatorEmpty,
  type PaginatorInfo,
} from "../paginator";

function makePaginator(overrides: Partial<PaginatorInfo> = {}): PaginatorInfo {
  return {
    currentPage: 1,
    lastPage: 5,
    hasMorePages: true,
    total: 50,
    ...overrides,
  };
}

describe("hasMorePages", () => {
  it("returns true when paginator has more pages", () => {
    const paginator = makePaginator({ hasMorePages: true });
    expect(hasMorePages(paginator)).toBe(true);
  });

  it("returns false when paginator has no more pages", () => {
    const paginator = makePaginator({ hasMorePages: false });
    expect(hasMorePages(paginator)).toBe(false);
  });
});

describe("getNextPage", () => {
  it("returns currentPage + 1", () => {
    const paginator = makePaginator({ currentPage: 1 });
    expect(getNextPage(paginator)).toBe(2);
  });

  it("returns 1 when currentPage is 0", () => {
    const paginator = makePaginator({ currentPage: 0 });
    expect(getNextPage(paginator)).toBe(1);
  });

  it("returns correct next page for large page number", () => {
    const paginator = makePaginator({ currentPage: 99 });
    expect(getNextPage(paginator)).toBe(100);
  });
});

describe("isPaginatorEmpty", () => {
  it("returns true when total is 0", () => {
    const paginator = makePaginator({ total: 0 });
    expect(isPaginatorEmpty(paginator)).toBe(true);
  });

  it("returns false when total is greater than 0", () => {
    const paginator = makePaginator({ total: 1 });
    expect(isPaginatorEmpty(paginator)).toBe(false);
  });

  it("returns false for large total", () => {
    const paginator = makePaginator({ total: 10000 });
    expect(isPaginatorEmpty(paginator)).toBe(false);
  });
});
