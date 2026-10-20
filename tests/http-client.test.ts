import { describe, expect, it, vi } from "vite-plus/test";
import { DevNullApiError } from "@/errors";
import { HttpClient } from "@/http/http-client";

describe("HttpClient", () => {
  it("sends a GET request and returns JSON", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(JSON.stringify({ ok: true })));

    await expect(new HttpClient({ fetcher }).get("users/nunomaduro")).resolves.toEqual({
      ok: true,
    });
    expect(fetcher).toHaveBeenCalledWith("https://dev-null.sh/api/v1/users/nunomaduro", {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  });

  it("throws when the API returns an error status", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 404 }));

    await expect(new HttpClient({ fetcher }).get("users/missing")).rejects.toMatchObject({
      name: "DevNullApiError",
      status: 404,
      message: "API request failed with HTTP 404.",
    });
  });

  it("converts nested snake_case fields and timestamps", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          created_at: "2026-10-15T13:02:44Z",
          author_data: { avatar_url: "https://example.test/avatar.png" },
          items: [{ updated_at: "2026-10-16T13:02:44Z" }],
        }),
      ),
    );

    await expect(new HttpClient({ fetcher }).get("users/nunomaduro")).resolves.toEqual({
      createdAt: new Date("2026-10-15T13:02:44Z"),
      authorData: { avatarUrl: "https://example.test/avatar.png" },
      items: [{ updatedAt: new Date("2026-10-16T13:02:44Z") }],
    });
  });

  it("wraps network errors", async () => {
    const error = new Error("offline");
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(error);

    await expect(new HttpClient({ fetcher }).get("users/nunomaduro")).rejects.toMatchObject({
      name: "DevNullNetworkError",
      cause: error,
    });
  });

  it("throws an API error for invalid JSON", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response("not json"));

    await expect(new HttpClient({ fetcher }).get("users/nunomaduro")).rejects.toBeInstanceOf(
      DevNullApiError,
    );
  });
});
