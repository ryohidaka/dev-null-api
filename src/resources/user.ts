import type { HttpClient } from "@/http/http-client";
import type { User } from "@/types";

interface UserResponse {
  data: User;
}

/** Operations for public user profiles. */
export class UserResource {
  /** Create a user resource with a shared HTTP transport. */
  constructor(private readonly http: HttpClient) {}

  /** Retrieve a public user profile. */
  async get(username: string): Promise<User> {
    const name = username.trim().replace(/^@/, "");
    if (!name) throw new TypeError("Username must not be empty.");

    const response = await this.http.get<UserResponse>(`users/${encodeURIComponent(name)}`);
    return response.data;
  }
}
