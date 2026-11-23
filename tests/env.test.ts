import { afterEach, describe, expect, it, vi } from "vitest";

const originalBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

async function loadAsset() {
  vi.resetModules();
  const mod = await import("@/lib/env");
  return mod.asset;
}

describe("asset()", () => {
  afterEach(() => {
    if (originalBasePath === undefined) {
      delete process.env.NEXT_PUBLIC_BASE_PATH;
    } else {
      process.env.NEXT_PUBLIC_BASE_PATH = originalBasePath;
    }
    vi.resetModules();
  });

  it("returns the path unchanged when NEXT_PUBLIC_BASE_PATH is unset", async () => {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
    const asset = await loadAsset();
    expect(asset("/x.svg")).toBe("/x.svg");
  });

  it("prefixes the path with NEXT_PUBLIC_BASE_PATH when it is set", async () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/base";
    const asset = await loadAsset();
    expect(asset("/x.svg")).toBe("/base/x.svg");
  });
});
