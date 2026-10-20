import { HttpClient } from "@/http/http-client";
import type { HttpClientOptions } from "@/types";
import { UserResource } from "@/resources/user";

/** Client for the public dev-null.sh API. */
export class DevNull {
  /** Shared HTTP transport for endpoint resources. */
  readonly http: HttpClient;

  /** User profile operations. */
  readonly users: UserResource;

  /** Create a client for the public API. */
  constructor(options: HttpClientOptions = {}) {
    this.http = new HttpClient(options);
    this.users = new UserResource(this.http);
  }
}
