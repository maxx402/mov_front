import { describe, it, expect } from "vitest";
import { isFeedbackReplied, getFeedbackStatusText, hasFeedbackOfficialReply, FeedbackStatus } from "../feedback";
import type { Feedback, FeedbackRecord, FeedbackDetail } from "../feedback";

describe("isFeedbackReplied", () => {
  it("returns true for Replied status", () => {
    expect(isFeedbackReplied({ status: FeedbackStatus.Replied } as Feedback)).toBe(true);
  });
  it("returns false for Pending status", () => {
    expect(isFeedbackReplied({ status: FeedbackStatus.Pending } as Feedback)).toBe(false);
  });
});

describe("getFeedbackStatusText", () => {
  it("returns 已回复 for status 1", () => {
    expect(getFeedbackStatusText({ status: 1 } as FeedbackRecord)).toBe("已回复");
  });
  it("returns 已关闭 for status 2", () => {
    expect(getFeedbackStatusText({ status: 2 } as FeedbackRecord)).toBe("已关闭");
  });
  it("returns 待处理 for status 0", () => {
    expect(getFeedbackStatusText({ status: 0 } as FeedbackRecord)).toBe("待处理");
  });
});

describe("hasFeedbackOfficialReply", () => {
  it("returns true when official comment exists", () => {
    const detail = { comments: [{ isOfficial: true }] } as unknown as FeedbackDetail;
    expect(hasFeedbackOfficialReply(detail)).toBe(true);
  });
  it("returns false when no official comment", () => {
    const detail = { comments: [{ isOfficial: false }] } as unknown as FeedbackDetail;
    expect(hasFeedbackOfficialReply(detail)).toBe(false);
  });
  it("returns false when no comments", () => {
    const detail = { comments: [] } as unknown as FeedbackDetail;
    expect(hasFeedbackOfficialReply(detail)).toBe(false);
  });
});
