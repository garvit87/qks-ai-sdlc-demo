import { describe, expect, it } from "vitest";
import { DEFAULT_POINTS } from "@/components/MatrixChart";

describe("DEFAULT_POINTS", () => {
  it("has 10 companies", () => {
    expect(DEFAULT_POINTS).toHaveLength(10);
  });

  it("keeps every x and y within 0-100", () => {
    for (const p of DEFAULT_POINTS) {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThanOrEqual(100);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThanOrEqual(100);
    }
  });

  it("has unique labels", () => {
    const labels = DEFAULT_POINTS.map((p) => p.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it("places at least 3 points in the SPARK Leaders column (x >= 66.7)", () => {
    const leaders = DEFAULT_POINTS.filter((p) => p.x >= 66.7);
    expect(leaders.length).toBeGreaterThanOrEqual(3);
  });
});
