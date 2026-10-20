import { describe, expect, it, vi } from "vite-plus/test";
import { DevNull } from "@/client";

const userResponse = {
  data: {
    id: "01a13fa8-6cd4-70ef-b8e5-f46a3ca70ca8",
    username: "nunomaduro",
    name: "nunomaduro",
    avatar_url: "https://avatars.githubusercontent.com/u/5457236?v=4",
    bio: "staff software engineer at @laravel",
    company: "@laravel",
    location: "Portugal",
    website: "https://youtube.com/@nunomaduro",
    github_url: "https://github.com/nunomaduro",
    html_url: "https://dev-null.sh/@nunomaduro",
    feed_url: "https://dev-null.sh/@nunomaduro/feed.atom",
    created_at: "2026-10-15T13:02:44Z",
    commits_count: 191,
    followers_count: 4003,
    following_count: 88,
  },
};

describe("UserResource", () => {
  it("gets a user by username", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(JSON.stringify(userResponse)));
    const api = new DevNull({ fetcher });

    await expect(api.users.get("@nunomaduro")).resolves.toEqual({
      id: "01a13fa8-6cd4-70ef-b8e5-f46a3ca70ca8",
      username: "nunomaduro",
      name: "nunomaduro",
      avatarUrl: "https://avatars.githubusercontent.com/u/5457236?v=4",
      bio: "staff software engineer at @laravel",
      company: "@laravel",
      location: "Portugal",
      website: "https://youtube.com/@nunomaduro",
      githubUrl: "https://github.com/nunomaduro",
      htmlUrl: "https://dev-null.sh/@nunomaduro",
      feedUrl: "https://dev-null.sh/@nunomaduro/feed.atom",
      createdAt: new Date("2026-10-15T13:02:44Z"),
      commitsCount: 191,
      followersCount: 4003,
      followingCount: 88,
    });
    expect(fetcher).toHaveBeenCalledWith(
      "https://dev-null.sh/api/v1/users/nunomaduro",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("rejects an empty username without making a request", async () => {
    const fetcher = vi.fn<typeof fetch>();
    const api = new DevNull({ fetcher });

    await expect(api.users.get("  ")).rejects.toThrow(TypeError);
    expect(fetcher).not.toHaveBeenCalled();
  });
});
