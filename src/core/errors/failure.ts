export abstract class Failure extends Error {
  readonly code?: string;
  readonly details?: string;

  constructor(message: string, opts?: { code?: string; details?: string }) {
    super(message);
    this.code = opts?.code;
    this.details = opts?.details;
    this.name = this.constructor.name;
  }

  get userMessage(): string {
    if (this.details && this.details.length > 0) {
      return this.details;
    }
    return this.message;
  }

  get fullMessage(): string {
    if (this.details && this.details.length > 0) {
      return `${this.message}: ${this.details}`;
    }
    return this.message;
  }
}

export class NetworkFailure extends Failure {
  constructor(opts: { code?: string; message: string; details?: string }) {
    super(opts.message, { code: opts.code, details: opts.details });
  }
}

export class ServerFailure extends Failure {
  constructor(opts: { code?: string; message: string; details?: string }) {
    super(opts.message, { code: opts.code, details: opts.details });
  }
}

export class AuthFailure extends Failure {
  constructor(opts: { code?: string; message: string; details?: string }) {
    super(opts.message, { code: opts.code, details: opts.details });
  }
}

export class PermissionFailure extends Failure {
  constructor(opts: { code?: string; message: string; details?: string }) {
    super(opts.message, { code: opts.code, details: opts.details });
  }
}

export class ApiFailure extends Failure {
  constructor(opts: { code?: string; message: string; details?: string }) {
    super(opts.message, { code: opts.code, details: opts.details });
  }
}

export class ValidationFailure extends Failure {
  constructor(opts: { code?: string; message: string; details?: string }) {
    super(opts.message, { code: opts.code, details: opts.details });
  }
}

export class DataFailure extends Failure {
  constructor(opts: { code?: string; message: string; details?: string }) {
    super(opts.message, { code: opts.code, details: opts.details });
  }
}

export class CacheFailure extends Failure {
  constructor(opts: { code?: string; message: string; details?: string }) {
    super(opts.message, { code: opts.code, details: opts.details });
  }
}

export class CancelledFailure extends Failure {
  constructor(opts: { code?: string; message: string; details?: string }) {
    super(opts.message, { code: opts.code, details: opts.details });
  }
}

export class UnknownFailure extends Failure {
  constructor(opts: { code?: string; message: string; details?: string }) {
    super(opts.message, { code: opts.code, details: opts.details });
  }
}
