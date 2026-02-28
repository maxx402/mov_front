import { describe, it, expect } from "vitest";
import { mapGender, mapUser } from "../user-mapper";
import { Gender } from "@/domain/entities/user";

describe("mapGender", () => {
  describe("number input", () => {
    it("maps 1 to Male", () => {
      expect(mapGender(1)).toBe(Gender.Male);
    });

    it("maps 2 to Female", () => {
      expect(mapGender(2)).toBe(Gender.Female);
    });

    it("maps 0 to Unknown", () => {
      expect(mapGender(0)).toBe(Gender.Unknown);
    });

    it("maps 99 to Unknown", () => {
      expect(mapGender(99)).toBe(Gender.Unknown);
    });
  });

  describe("string input", () => {
    it('maps "male" to Male', () => {
      expect(mapGender("male")).toBe(Gender.Male);
    });

    it('maps "female" to Female', () => {
      expect(mapGender("female")).toBe(Gender.Female);
    });

    it("is case-insensitive for Male", () => {
      expect(mapGender("MALE")).toBe(Gender.Male);
      expect(mapGender("Male")).toBe(Gender.Male);
    });

    it("is case-insensitive for Female", () => {
      expect(mapGender("FEMALE")).toBe(Gender.Female);
      expect(mapGender("Female")).toBe(Gender.Female);
    });

    it('maps unrecognized string to Unknown', () => {
      expect(mapGender("other")).toBe(Gender.Unknown);
      expect(mapGender("")).toBe(Gender.Unknown);
    });
  });

  describe("other types", () => {
    it("maps undefined to Unknown", () => {
      expect(mapGender(undefined)).toBe(Gender.Unknown);
    });

    it("maps null to Unknown", () => {
      expect(mapGender(null)).toBe(Gender.Unknown);
    });

    it("maps boolean to Unknown", () => {
      expect(mapGender(true)).toBe(Gender.Unknown);
    });

    it("maps object to Unknown", () => {
      expect(mapGender({})).toBe(Gender.Unknown);
    });
  });
});

describe("mapUser", () => {
  it("maps all fields when fully provided", () => {
    const data = {
      id: "u1",
      name: "John",
      nickname: "Johnny",
      avatar: "https://example.com/avatar.png",
      gender: 1,
      bio: "Hello world",
      phone: "1234567890",
      email: "john@example.com",
      is_guest: true,
    };

    const result = mapUser(data);

    expect(result).toEqual({
      id: "u1",
      name: "John",
      nickname: "Johnny",
      avatar: "https://example.com/avatar.png",
      gender: Gender.Male,
      bio: "Hello world",
      phone: "1234567890",
      email: "john@example.com",
      isGuest: true,
    });
  });

  it("converts null optional fields to undefined", () => {
    const data = {
      id: "u2",
      name: "Jane",
      nickname: null,
      avatar: null,
      gender: null,
      bio: null,
      phone: null,
      email: null,
    };

    const result = mapUser(data);

    expect(result.nickname).toBeUndefined();
    expect(result.avatar).toBeUndefined();
    expect(result.bio).toBeUndefined();
    expect(result.phone).toBeUndefined();
    expect(result.email).toBeUndefined();
    expect(result.gender).toBe(Gender.Unknown);
  });

  it("defaults isGuest to false when is_guest is not provided", () => {
    const data = {
      id: "u3",
      name: "Guest",
    };

    const result = mapUser(data);

    expect(result.isGuest).toBe(false);
  });

  it("converts undefined optional fields to undefined", () => {
    const data = {
      id: "u4",
      name: "Minimal",
    };

    const result = mapUser(data);

    expect(result.nickname).toBeUndefined();
    expect(result.avatar).toBeUndefined();
    expect(result.bio).toBeUndefined();
    expect(result.phone).toBeUndefined();
    expect(result.email).toBeUndefined();
    expect(result.gender).toBe(Gender.Unknown);
  });
});
