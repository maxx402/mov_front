import { describe, it, expect, vi } from "vitest";

vi.mock("@apollo/client/errors", () => ({
  CombinedGraphQLErrors: {
    is: (error: any) => error?._type === "CombinedGraphQLErrors",
  },
  ServerError: {
    is: (error: any) => error?._type === "ServerError",
  },
}));

import { FailureMapper } from "../failure-mapper";
import {
  Failure,
  NetworkFailure,
  AuthFailure,
  ApiFailure,
  ServerFailure,
  DataFailure,
  UnknownFailure,
} from "../failure";

describe("FailureMapper", () => {
  describe("fromError", () => {
    it("returns Failure as-is if already a Failure", () => {
      const f = new NetworkFailure({ message: "test" });
      expect(FailureMapper.fromError(f)).toBe(f);
    });

    it("maps CombinedGraphQLErrors to fromGraphQLErrors", () => {
      const error = {
        _type: "CombinedGraphQLErrors",
        errors: [{ message: "gql error", extensions: {} }],
        message: "gql",
      };
      const result = FailureMapper.fromError(error);
      expect(result).toBeInstanceOf(ApiFailure);
    });

    it("maps ServerError to fromServerError", () => {
      const error = { _type: "ServerError", statusCode: 500, message: "server" };
      const result = FailureMapper.fromError(error);
      expect(result).toBeInstanceOf(ServerFailure);
    });

    it("maps TypeError to DataFailure", () => {
      const result = FailureMapper.fromError(new TypeError("bad type"));
      expect(result).toBeInstanceOf(DataFailure);
    });

    it("maps 'Failed to fetch' to NetworkFailure", () => {
      const result = FailureMapper.fromError(new Error("Failed to fetch"));
      expect(result).toBeInstanceOf(NetworkFailure);
    });

    it("maps NetworkError message to NetworkFailure", () => {
      const result = FailureMapper.fromError(new Error("NetworkError when attempting"));
      expect(result).toBeInstanceOf(NetworkFailure);
    });

    it("maps generic Error to UnknownFailure", () => {
      const result = FailureMapper.fromError(new Error("something"));
      expect(result).toBeInstanceOf(UnknownFailure);
    });

    it("maps non-Error to UnknownFailure with String()", () => {
      const result = FailureMapper.fromError("string error");
      expect(result).toBeInstanceOf(UnknownFailure);
      expect(result.details).toBe("string error");
    });
  });

  describe("fromGraphQLErrors", () => {
    it("returns AuthFailure for 401 status", () => {
      const error = {
        _type: "CombinedGraphQLErrors",
        errors: [{ message: "unauth", extensions: { status: 401 } }],
        message: "",
      };
      const result = FailureMapper.fromGraphQLErrors(error as any);
      expect(result).toBeInstanceOf(AuthFailure);
    });

    it("returns AuthFailure for UNAUTHENTICATED code", () => {
      const error = {
        _type: "CombinedGraphQLErrors",
        errors: [{ message: "unauth", extensions: { code: "UNAUTHENTICATED" } }],
        message: "",
      };
      const result = FailureMapper.fromGraphQLErrors(error as any);
      expect(result).toBeInstanceOf(AuthFailure);
    });

    it("returns ApiFailure for other errors", () => {
      const error = {
        _type: "CombinedGraphQLErrors",
        errors: [{ message: "bad request", extensions: { code: "BAD_INPUT" } }],
        message: "",
      };
      const result = FailureMapper.fromGraphQLErrors(error as any);
      expect(result).toBeInstanceOf(ApiFailure);
    });

    it("returns NetworkFailure when errors array is empty", () => {
      const error = {
        _type: "CombinedGraphQLErrors",
        errors: [],
        message: "no errors",
      };
      const result = FailureMapper.fromGraphQLErrors(error as any);
      expect(result).toBeInstanceOf(NetworkFailure);
    });
  });

  describe("fromServerError", () => {
    it("returns AuthFailure for 401", () => {
      const result = FailureMapper.fromServerError({
        _type: "ServerError",
        statusCode: 401,
        message: "",
      } as any);
      expect(result).toBeInstanceOf(AuthFailure);
    });

    it("returns AuthFailure for 403", () => {
      const result = FailureMapper.fromServerError({
        _type: "ServerError",
        statusCode: 403,
        message: "",
      } as any);
      expect(result).toBeInstanceOf(AuthFailure);
    });

    it("returns ServerFailure for 500+", () => {
      const result = FailureMapper.fromServerError({
        _type: "ServerError",
        statusCode: 500,
        message: "",
      } as any);
      expect(result).toBeInstanceOf(ServerFailure);
    });

    it("returns ServerFailure for 503", () => {
      const result = FailureMapper.fromServerError({
        _type: "ServerError",
        statusCode: 503,
        message: "",
      } as any);
      expect(result).toBeInstanceOf(ServerFailure);
    });

    it("returns NetworkFailure for other status codes", () => {
      const result = FailureMapper.fromServerError({
        _type: "ServerError",
        statusCode: 400,
        message: "bad",
      } as any);
      expect(result).toBeInstanceOf(NetworkFailure);
    });
  });
});
