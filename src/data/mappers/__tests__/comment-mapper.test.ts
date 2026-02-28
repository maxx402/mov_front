import { describe, it, expect } from "vitest";
import { mapComment } from "../comment-mapper";

describe("mapComment", () => {
  it("maps all fields when fully provided", () => {
    const data = {
      id: "c1",
      user: {
        id: "u1",
        name: "John",
        avatar: "https://example.com/avatar.png",
      },
      content: "Great movie!",
      statistics: {
        like_count: 42,
        reply_count: 5,
      },
      liked: true,
      is_top: true,
      replyToComment: {
        id: "c0",
        user: { name: "Jane" },
      },
      created_at: "2024-01-15T10:30:00Z",
    };

    const result = mapComment(data);

    expect(result).toEqual({
      id: "c1",
      userId: "u1",
      userName: "John",
      userAvatar: "https://example.com/avatar.png",
      content: "Great movie!",
      likeCount: 42,
      replyCount: 5,
      isLiked: true,
      isTop: true,
      replyTo: {
        commentId: "c0",
        userName: "Jane",
      },
      createdAt: "2024-01-15T10:30:00Z",
    });
  });

  it("defaults user fields when user is null", () => {
    const data = {
      id: "c2",
      user: null,
      content: "Anonymous comment",
      created_at: "2024-02-01T00:00:00Z",
    };

    const result = mapComment(data);

    expect(result.userId).toBe("");
    expect(result.userName).toBe("");
    expect(result.userAvatar).toBeUndefined();
  });

  it("defaults user fields when user is undefined", () => {
    const data = {
      id: "c3",
      content: "No user",
      created_at: "2024-03-01T00:00:00Z",
    };

    const result = mapComment(data);

    expect(result.userId).toBe("");
    expect(result.userName).toBe("");
    expect(result.userAvatar).toBeUndefined();
  });

  it("defaults statistics when statistics is missing", () => {
    const data = {
      id: "c4",
      content: "No stats",
      created_at: "2024-04-01T00:00:00Z",
    };

    const result = mapComment(data);

    expect(result.likeCount).toBe(0);
    expect(result.replyCount).toBe(0);
  });

  it("defaults liked to false and is_top to false when missing", () => {
    const data = {
      id: "c5",
      content: "Defaults",
      created_at: "2024-05-01T00:00:00Z",
    };

    const result = mapComment(data);

    expect(result.isLiked).toBe(false);
    expect(result.isTop).toBe(false);
  });

  it("sets replyTo to undefined when replyToComment is null", () => {
    const data = {
      id: "c6",
      content: "No reply target",
      replyToComment: null,
      created_at: "2024-06-01T00:00:00Z",
    };

    const result = mapComment(data);

    expect(result.replyTo).toBeUndefined();
  });

  it("sets replyTo to undefined when replyToComment is absent", () => {
    const data = {
      id: "c7",
      content: "No reply field",
      created_at: "2024-07-01T00:00:00Z",
    };

    const result = mapComment(data);

    expect(result.replyTo).toBeUndefined();
  });

  it("maps replyToComment with missing user name to empty string", () => {
    const data = {
      id: "c8",
      content: "Reply with no user name",
      replyToComment: {
        id: "c0",
        user: null,
      },
      created_at: "2024-08-01T00:00:00Z",
    };

    const result = mapComment(data);

    expect(result.replyTo).toEqual({
      commentId: "c0",
      userName: "",
    });
  });

  it("converts null avatar to undefined", () => {
    const data = {
      id: "c9",
      user: {
        id: "u2",
        name: "No Avatar",
        avatar: null,
      },
      content: "Null avatar",
      created_at: "2024-09-01T00:00:00Z",
    };

    const result = mapComment(data);

    expect(result.userAvatar).toBeUndefined();
  });

  it("passes through created_at as createdAt", () => {
    const data = {
      id: "c10",
      content: "Timestamp test",
      created_at: "2024-12-25T12:00:00Z",
    };

    const result = mapComment(data);

    expect(result.createdAt).toBe("2024-12-25T12:00:00Z");
  });
});
