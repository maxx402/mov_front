import { describe, it, expect, vi } from "vitest";
import { createErrorLink } from "../error-link";

describe("createErrorLink", () => {
  it("returns an ApolloLink", () => {
    const link = createErrorLink();
    expect(link).toBeDefined();
  });

  it("accepts onUnauthenticated callback", () => {
    const fn = vi.fn();
    const link = createErrorLink(fn);
    expect(link).toBeDefined();
  });
});
