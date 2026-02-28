import { describe, it, expect } from "vitest";
import { stripHtmlTags } from "../html";

describe("stripHtmlTags", () => {
  it("removes simple tags", () => {
    expect(stripHtmlTags("<p>hello</p>")).toBe("hello");
  });

  it("removes nested tags", () => {
    expect(stripHtmlTags("<div><b>bold</b></div>")).toBe("bold");
  });

  it("returns plain text as-is", () => {
    expect(stripHtmlTags("no tags")).toBe("no tags");
  });

  it("returns empty for empty input", () => {
    expect(stripHtmlTags("")).toBe("");
  });

  it("handles self-closing tags", () => {
    expect(stripHtmlTags("hello<br/>world")).toBe("helloworld");
  });

  it("handles multiple tags", () => {
    expect(stripHtmlTags("<b>a</b> and <i>b</i>")).toBe("a and b");
  });
});
