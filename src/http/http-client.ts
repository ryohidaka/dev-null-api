import { transformResponse } from "@/http/response-transformer";
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
    const response = await this.request(this.resolveUrl(path));

    if (!response.ok) throw new Error(`API request failed with HTTP ${response.status}.`);
    return transformResponse(await response.json()) as T;
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
