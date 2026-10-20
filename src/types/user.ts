/** Public profile returned by `GET /api/v1/users/{username}`. */
export interface User {
  /** Unique user identifier. */
  id: number | string;
  /** Account username. */
  username: string;
  /** Display name, when set. */
  name?: string | null;
  /** Public profile biography, when set. */
  bio?: string | null;
  /** Avatar URL, when set. */
  avatarUrl?: string | null;
  /** Company, when set. */
  company?: string | null;
  /** Location, when set. */
  location?: string | null;
  /** Personal website, when set. */
  website?: string | null;
  /** GitHub profile URL, when set. */
  githubUrl?: string | null;
  /** Public profile URL on dev-null.sh. */
  htmlUrl?: string | null;
  /** Atom feed URL for the user's activity. */
  feedUrl?: string | null;
  /** Account creation timestamp, when available. */
  createdAt?: Date;
  /** Number of public commits. */
  commitsCount?: number;
  /** Number of followers. */
  followersCount?: number;
  /** Number of accounts followed. */
  followingCount?: number;
  /** Additional fields returned by the API. */
  [key: string]: unknown;
}
