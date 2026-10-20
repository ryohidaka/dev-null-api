/** Error returned when the API responds with an unsuccessful HTTP status. */
export class DevNullApiError extends Error {
  /** Create an API error with response context. */
  constructor(
    message: string,
    public readonly status: number,
    public readonly url: string,
    public readonly responseBody?: unknown,
  ) {
    super(message);
    this.name = "DevNullApiError";
  }
}

/** Error raised when a request fails before an HTTP response is received. */
export class DevNullNetworkError extends Error {
  /** Create a network error with its original cause. */
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "DevNullNetworkError";
  }
}
