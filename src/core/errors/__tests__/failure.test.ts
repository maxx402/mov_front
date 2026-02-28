import { describe, it, expect } from "vitest";
import {
  Failure,
  NetworkFailure,
  ServerFailure,
  AuthFailure,
  PermissionFailure,
  ApiFailure,
  ValidationFailure,
  DataFailure,
  CacheFailure,
  CancelledFailure,
  UnknownFailure,
} from "@/core/errors/failure";

const failureClasses = [
  { name: "NetworkFailure", Cls: NetworkFailure },
  { name: "ServerFailure", Cls: ServerFailure },
  { name: "AuthFailure", Cls: AuthFailure },
  { name: "PermissionFailure", Cls: PermissionFailure },
  { name: "ApiFailure", Cls: ApiFailure },
  { name: "ValidationFailure", Cls: ValidationFailure },
  { name: "DataFailure", Cls: DataFailure },
  { name: "CacheFailure", Cls: CacheFailure },
  { name: "CancelledFailure", Cls: CancelledFailure },
  { name: "UnknownFailure", Cls: UnknownFailure },
] as const;

describe("Failure subclasses", () => {
  for (const { name, Cls } of failureClasses) {
    describe(name, () => {
      it("extends Failure and Error", () => {
        const failure = new Cls({ message: "test" });

        expect(failure).toBeInstanceOf(Failure);
        expect(failure).toBeInstanceOf(Error);
      });

      it("sets the name to the class name", () => {
        const failure = new Cls({ message: "test" });

        expect(failure.name).toBe(name);
      });

      it("stores message correctly", () => {
        const failure = new Cls({ message: "something went wrong" });

        expect(failure.message).toBe("something went wrong");
      });

      it("stores code when provided", () => {
        const failure = new Cls({ code: "ERR_CODE", message: "error" });

        expect(failure.code).toBe("ERR_CODE");
      });

      it("has undefined code when not provided", () => {
        const failure = new Cls({ message: "error" });

        expect(failure.code).toBeUndefined();
      });

      it("stores details when provided", () => {
        const failure = new Cls({
          message: "error",
          details: "detailed info",
        });

        expect(failure.details).toBe("detailed info");
      });

      it("has undefined details when not provided", () => {
        const failure = new Cls({ message: "error" });

        expect(failure.details).toBeUndefined();
      });
    });
  }

  describe("userMessage", () => {
    it("returns details when details is present", () => {
      const failure = new UnknownFailure({
        message: "base message",
        details: "user-facing detail",
      });

      expect(failure.userMessage).toBe("user-facing detail");
    });

    it("returns message when details is absent", () => {
      const failure = new UnknownFailure({
        message: "base message",
      });

      expect(failure.userMessage).toBe("base message");
    });

    it("returns message when details is empty string", () => {
      const failure = new UnknownFailure({
        message: "base message",
        details: "",
      });

      expect(failure.userMessage).toBe("base message");
    });
  });

  describe("fullMessage", () => {
    it("returns 'message: details' when details is present", () => {
      const failure = new NetworkFailure({
        message: "network error",
        details: "timeout after 30s",
      });

      expect(failure.fullMessage).toBe("network error: timeout after 30s");
    });

    it("returns just message when details is absent", () => {
      const failure = new NetworkFailure({
        message: "network error",
      });

      expect(failure.fullMessage).toBe("network error");
    });

    it("returns just message when details is empty string", () => {
      const failure = new NetworkFailure({
        message: "network error",
        details: "",
      });

      expect(failure.fullMessage).toBe("network error");
    });
  });

  describe("all constructor options together", () => {
    it("stores code, message, and details", () => {
      const failure = new ServerFailure({
        code: "500",
        message: "Internal Server Error",
        details: "Database connection lost",
      });

      expect(failure.name).toBe("ServerFailure");
      expect(failure.code).toBe("500");
      expect(failure.message).toBe("Internal Server Error");
      expect(failure.details).toBe("Database connection lost");
      expect(failure.userMessage).toBe("Database connection lost");
      expect(failure.fullMessage).toBe(
        "Internal Server Error: Database connection lost",
      );
    });
  });
});
