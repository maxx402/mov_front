import { describe, it, expect, vi } from "vitest";

vi.mock("@/core/utils/html", () => ({
  stripHtmlTags: vi.fn((s: string) => s.replace(/<[^>]*>/g, "")),
}));

import { getActorPlainDescription } from "../actor";
import type { Actor } from "../actor";

function makeActor(overrides: Partial<Actor> = {}): Actor {
  return { id: "1", name: "Actor", ...overrides };
}

describe("getActorPlainDescription", () => {
  it("returns stripped description", () => {
    expect(getActorPlainDescription(makeActor({ description: "<p>Bio</p>" }))).toBe("Bio");
  });
  it("returns empty string when no description", () => {
    expect(getActorPlainDescription(makeActor())).toBe("");
  });
});
