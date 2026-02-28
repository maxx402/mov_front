import { CombinedGraphQLErrors, ServerError } from "@apollo/client/errors";
import {
  Failure,
  NetworkFailure,
  ServerFailure,
  AuthFailure,
  ApiFailure,
  DataFailure,
  UnknownFailure,
} from "./failure";

export class FailureMapper {
  private constructor() {}

  static fromError(error: unknown): Failure {
    if (error instanceof Failure) {
      return error;
    }

    if (CombinedGraphQLErrors.is(error)) {
      return FailureMapper.fromGraphQLErrors(error);
    }

    if (ServerError.is(error)) {
      return FailureMapper.fromServerError(error);
    }

    if (error instanceof TypeError) {
      return new DataFailure({
        code: "TYPE_ERROR",
        message: "数据类型错误",
        details: error.message,
      });
    }

    if (error instanceof Error) {
      if (error.message === "Failed to fetch" || error.message.includes("NetworkError")) {
        return new NetworkFailure({
          code: "NETWORK_ERROR",
          message: "网络连接失败",
          details: "无法连接到服务器\n请检查网络连接或稍后重试",
        });
      }
      return new UnknownFailure({
        code: "UNKNOWN",
        message: "未知错误",
        details: error.message,
      });
    }

    return new UnknownFailure({
      code: "UNKNOWN",
      message: "未知错误",
      details: String(error),
    });
  }

  static fromGraphQLErrors(error: CombinedGraphQLErrors): Failure {
    if (error.errors.length > 0) {
      const gqlError = error.errors[0];
      const extensions = gqlError.extensions;
      const code = extensions?.["code"] as string | undefined;
      const statusCode = extensions?.["status"] as number | undefined;

      if (statusCode === 401 || code === "UNAUTHENTICATED") {
        return new AuthFailure({
          code: "UNAUTHORIZED",
          message: "登录已过期",
          details: "请重新登录后继续",
        });
      }

      return new ApiFailure({
        code: code ?? statusCode?.toString(),
        message: gqlError.message || "API请求失败",
      });
    }

    return new NetworkFailure({
      code: "UNKNOWN_NETWORK_ERROR",
      message: "网络请求失败",
      details: error.message,
    });
  }

  static fromServerError(error: ServerError): Failure {
    const statusCode = error.statusCode;

    if (statusCode === 401) {
      return new AuthFailure({
        code: "UNAUTHORIZED",
        message: "登录已过期",
        details: "请重新登录后继续",
      });
    }
    if (statusCode === 403) {
      return new AuthFailure({
        code: "FORBIDDEN",
        message: "权限不足",
        details: "您没有执行此操作的权限",
      });
    }
    if (statusCode >= 500) {
      return new ServerFailure({
        code: "SERVER_ERROR",
        message: "服务器异常",
        details: "服务器开小差了，请稍后重试",
      });
    }

    return new NetworkFailure({
      code: "NETWORK_ERROR",
      message: "网络连接失败",
      details: error.message,
    });
  }
}
