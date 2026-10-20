import { describe, expect, it, vi } from "vite-plus/test";
import { DevNull } from "@/client";

describe("DevNull", () => {
  it("can be instantiated", () => {
    expect(new DevNull()).toBeInstanceOf(DevNull);
  });

  it("accepts HTTP client options", () => {
    expect(() => new DevNull({ fetcher: vi.fn<typeof fetch>() })).not.toThrow();
  });
});
