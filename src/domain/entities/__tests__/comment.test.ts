import { describe, it, expect } from "vitest";
import { hasCommentReplies } from "../comment";
import type { Comment } from "../comment";

function makeComment(overrides: Partial<Comment> = {}): Comment {
  return { id: "1", userId: "u1", userName: "user", content: "hi", likeCount: 0, replyCount: 0, isLiked: false, isTop: false, createdAt: "2024-01-01", ...overrides };
}

describe("hasCommentReplies", () => {
  it("returns true when replyCount > 0", () => {
    expect(hasCommentReplies(makeComment({ replyCount: 3 }))).toBe(true);
  });
  it("returns false when replyCount is 0", () => {
    expect(hasCommentReplies(makeComment({ replyCount: 0 }))).toBe(false);
  });
});
