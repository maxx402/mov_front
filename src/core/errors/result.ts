import { Failure } from "./failure";

export class Result<T> {
  private readonly _value: T | undefined;
  private readonly _error: Failure | undefined;
  private readonly _isSuccess: boolean;

  private constructor(value: T | undefined, error: Failure | undefined, isSuccess: boolean) {
    this._value = value;
    this._error = error;
    this._isSuccess = isSuccess;
  }

  static success<T>(value: T): Result<T> {
    return new Result<T>(value, undefined, true);
  }

  static failure<T>(error: Failure): Result<T> {
    return new Result<T>(undefined, error, false);
  }

  get isSuccess(): boolean {
    return this._isSuccess;
  }

  get isFailure(): boolean {
    return !this._isSuccess;
  }

  get value(): T | undefined {
    return this._value;
  }

  get error(): Failure | undefined {
    return this._error;
  }

  fold<R>(onError: (error: Failure) => R, onSuccess: (value: T) => R): R {
    if (this._isSuccess) {
      return onSuccess(this._value as T);
    }
    return onError(this._error as Failure);
  }
}
