import { describe, expect, it } from "vitest";
import { report } from "@/lib/reports/marketplace-development-platform";
import { reportJsonLd } from "@/lib/structuredData";

const PAGE_URL =
  "https://qksgroup.com/market-research/spark-matrix-marketplace-development-platform-q4-2024/";

const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

describe("marketplace development platform report data", () => {
  it("has a short answer of 20 to 60 words", () => {
    const n = wordCount(report.shortAnswer);
    expect(n).toBeGreaterThanOrEqual(20);
    expect(n).toBeLessThanOrEqual(60);
  });

  it("has at least 4 key facts", () => {
    expect(report.keyFacts.length).toBeGreaterThanOrEqual(4);
  });

  it("has 5 FAQ items, each answer 30 to 70 words", () => {
    expect(report.faq).toHaveLength(5);
    for (const item of report.faq) {
      const n = wordCount(item.a);
      expect(n, item.q).toBeGreaterThanOrEqual(30);
      expect(n, item.q).toBeLessThanOrEqual(70);
    }
  });

  it("lists 14 vendors", () => {
    expect(report.vendors).toHaveLength(14);
  });
});

describe("reportJsonLd", () => {
  const jsonLd = reportJsonLd(report, PAGE_URL);
  const graph = jsonLd["@graph"] as Array<Record<string, any>>;
  const byType = (type: string) => graph.find((node) => node["@type"] === type);

  it("uses the schema.org context and contains the four node types", () => {
    expect(jsonLd["@context"]).toBe("https://schema.org");
    const types = graph.map((node) => node["@type"]).sort();
    expect(types).toEqual(["BreadcrumbList", "FAQPage", "Organization", "Report"]);
  });

  it("FAQPage mainEntity length equals the FAQ length", () => {
    expect(byType("FAQPage")?.mainEntity).toHaveLength(report.faq.length);
  });

  it("Report publisher is QKS Group", () => {
    expect(byType("Report")?.publisher.name).toBe("QKS Group");
    expect(byType("Report")?.offers.price).toBe("5000");
    expect(byType("Report")?.isAccessibleForFree).toBe(false);
  });

  it("BreadcrumbList runs Home, Research Library, title", () => {
    const names = byType("BreadcrumbList")?.itemListElement.map(
      (item: { name: string }) => item.name,
    );
    expect(names).toEqual(["Home", "Research Library", report.shortTitle]);
  });

  it("survives a JSON round-trip", () => {
    expect(JSON.parse(JSON.stringify(jsonLd))).toEqual(jsonLd);
  });
});
