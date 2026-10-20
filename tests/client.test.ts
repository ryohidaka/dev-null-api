import { describe, expect, it } from "vite-plus/test";
import { DevNull } from "@/client";

describe("DevNull", () => {
  it("can be instantiated", () => {
    expect(new DevNull()).toBeInstanceOf(DevNull);
  });
});
