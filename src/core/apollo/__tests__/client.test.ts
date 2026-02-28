import { describe, it, expect, beforeEach } from "vitest";
import { getApolloClient, resetApolloClient } from "../client";

describe("getApolloClient", () => {
  beforeEach(() => {
    resetApolloClient();
  });

  it("returns an ApolloClient instance", () => {
    const client = getApolloClient(() => null);
    expect(client).toBeDefined();
  });

  it("returns same instance on second call", () => {
    const c1 = getApolloClient(() => null);
    const c2 = getApolloClient(() => null);
    expect(c1).toBe(c2);
  });

  it("returns new instance after reset", () => {
    const c1 = getApolloClient(() => null);
    resetApolloClient();
    const c2 = getApolloClient(() => null);
    expect(c1).not.toBe(c2);
  });
});
