/** Options used to configure the HTTP transport. */
export interface HttpClientOptions {
  /** Fetch implementation used for requests and tests. */
  fetcher?: typeof fetch;
}
