import { describe, it, expect } from "vitest";
import { Result } from "@/core/errors/result";
import { UnknownFailure } from "@/core/errors/failure";

describe("Result", () => {
  describe("Result.success", () => {
    it("creates a successful result with the given value", () => {
      const result = Result.success(42);

      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(result.value).toBe(42);
      expect(result.error).toBeUndefined();
    });

    it("works with string values", () => {
      const result = Result.success("hello");

      expect(result.isSuccess).toBe(true);
      expect(result.value).toBe("hello");
    });

    it("works with object values", () => {
      const obj = { name: "test", id: 1 };
      const result = Result.success(obj);

      expect(result.isSuccess).toBe(true);
      expect(result.value).toEqual(obj);
    });

    it("works with null value", () => {
      const result = Result.success(null);

      expect(result.isSuccess).toBe(true);
      expect(result.value).toBeNull();
    });

    it("works with undefined value", () => {
      const result = Result.success(undefined);

      expect(result.isSuccess).toBe(true);
      expect(result.value).toBeUndefined();
    });
  });

  describe("Result.failure", () => {
    it("creates a failed result with the given error", () => {
      const failure = new UnknownFailure({ message: "something went wrong" });
      const result = Result.failure<number>(failure);

      expect(result.isSuccess).toBe(false);
      expect(result.isFailure).toBe(true);
      expect(result.value).toBeUndefined();
      expect(result.error).toBe(failure);
    });

    it("preserves failure details", () => {
      const failure = new UnknownFailure({
        code: "ERR_01",
        message: "error message",
        details: "error details",
      });
      const result = Result.failure<string>(failure);

      expect(result.error).toBe(failure);
      expect(result.error?.message).toBe("error message");
      expect(result.error?.code).toBe("ERR_01");
      expect(result.error?.details).toBe("error details");
    });
  });

  describe("fold", () => {
    it("calls onSuccess for a successful result", () => {
      const result = Result.success(10);

      const output = result.fold(
        (error) => `error: ${error.message}`,
        (value) => `value: ${value}`,
      );

      expect(output).toBe("value: 10");
    });

    it("calls onError for a failed result", () => {
      const failure = new UnknownFailure({ message: "failed" });
      const result = Result.failure<number>(failure);

      const output = result.fold(
        (error) => `error: ${error.message}`,
        (value) => `value: ${value}`,
      );

      expect(output).toBe("error: failed");
    });

    it("supports transforming to a different type", () => {
      const result = Result.success("hello");

      const length = result.fold(
        () => -1,
        (value) => value.length,
      );

      expect(length).toBe(5);
    });

    it("passes the actual failure instance to onError", () => {
      const failure = new UnknownFailure({
        code: "TEST",
        message: "test error",
        details: "some details",
      });
      const result = Result.failure<string>(failure);

      result.fold(
        (error) => {
          expect(error).toBe(failure);
          expect(error.code).toBe("TEST");
          expect(error.details).toBe("some details");
          return null;
        },
        () => null,
      );
    });
  });
});
