import { HttpClient } from "@/http/http-client";
import type { HttpClientOptions } from "@/types";

/** Client for the public dev-null.sh API. */
export class DevNull {
  /** Shared HTTP transport for endpoint resources. */
  readonly http: HttpClient;

  /** Create a client for the public API. */
  constructor(options: HttpClientOptions = {}) {
    this.http = new HttpClient(options);
  }
}
