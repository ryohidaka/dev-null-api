import { transformResponse } from "@/http/response-transformer";
import { DevNullApiError, DevNullNetworkError } from "@/errors";
import type { HttpClientOptions } from "@/types";

const API_BASE_URL = "https://dev-null.sh/api/v1";

/** Shared HTTP transport for the API resources. */
export class HttpClient {
  private readonly fetcher: typeof fetch;

  /** Create an HTTP transport. */
  constructor(options: HttpClientOptions = {}) {
    this.fetcher = options.fetcher ?? fetch;
  }

  /** Send a GET request and return its JSON response. */
  async get<T>(path: string): Promise<T> {
    const url = this.resolveUrl(path);
    let response: Response;

    try {
      response = await this.request(url);
    } catch (error) {
      throw new DevNullNetworkError("Failed to connect to dev-null.sh API.", error);
    }

    const body = await this.parseBody(response, url);
    if (!response.ok) {
      const message =
        this.extractMessage(body) ?? `API request failed with HTTP ${response.status}.`;
      throw new DevNullApiError(message, response.status, url, body);
    }
    return transformResponse(body) as T;
  }

  /** Read and parse a response body, including invalid JSON errors. */
  private async parseBody(response: Response, url: string): Promise<unknown> {
    const text = await response.text();
    if (!text) return undefined;

    try {
      return JSON.parse(text) as unknown;
    } catch (error) {
      throw new DevNullApiError(
        "API returned an invalid JSON response.",
        response.status,
        url,
        error,
      );
    }
  }

  /** Extract the API's standard error message when available. */
  private extractMessage(body: unknown): string | undefined {
    if (!isRecord(body)) return undefined;
    const message = body.message;
    return typeof message === "string" && message ? message : undefined;
  }

  /** Resolve an API path against the fixed public API URL. */
  private resolveUrl(path: string): string {
    return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
  }

  /** Send a request with the headers shared by all API calls. */
  private request(url: string): Promise<Response> {
    return this.fetcher(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  }
}

/** Check whether a value can be read as a string-keyed object. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
