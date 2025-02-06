export class ApiError extends Error {
  status: number;
  errors: Record<string, string>;
  constructor(
    status: number,
    message: string,
    errors: Record<string, string> = {},
  ) {
    super(message);
    this.status = status;
    this.errors = errors;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static BadRequest(message: string, errors: Record<string, string>) {
    return new ApiError(400, message, errors);
  }

  static Unauthorized(message?: string) {
    return new ApiError(401, message || 'User is not authorized');
  }

  static NotFound() {
    return new ApiError(404, 'Not found');
  }
}
