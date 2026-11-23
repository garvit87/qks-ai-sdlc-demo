import { describe, expect, it } from "vitest";
// @ts-ignore -- plain .mjs script, no type declarations
import { checkPage } from "../scripts/seo-check.mjs";

const head = (extra = "") => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>QKS Group demo: AI-SDLC research and insights</title>
  <meta name="description" content="A demo replica of the QKS Group homepage used to show an AI-assisted delivery pipeline, with research pages and market insight summaries for the walkthrough.">
  <meta name="robots" content="noindex, nofollow">
  <link rel="canonical" href="https://example.github.io/qks-ai-sdlc-demo/">
  <meta property="og:title" content="QKS Group demo">
  <meta property="og:description" content="Demo replica for the Vayasoft AI-SDLC walkthrough.">
  ${extra}
</head>`;

const ANSWER =
  "QKS Group is a demo replica that explains how market research reports are structured for search and answer engines, covering the key facts, the questions readers ask, and the sources behind each figure in the report.";

const reportBody = (overrides: { answer?: string | null; faqCount?: number; jsonLd?: string } = {}) => {
  const answer = overrides.answer === undefined ? ANSWER : overrides.answer;
  const faqCount = overrides.faqCount ?? 3;
  const faqItems = Array.from({ length: faqCount }, (_, i) => `
      <div data-faq-item>
        <h3 data-faq-q>Question ${i + 1}?</h3>
        <p data-faq-a>Answer ${i + 1}.</p>
      </div>`).join("");
  const faqEntities = Array.from({ length: faqCount }, (_, i) => ({
    "@type": "Question",
    name: `Question ${i + 1}?`,
    acceptedAnswer: { "@type": "Answer", text: `Answer ${i + 1}.` },
  }));
  const defaultJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Report",
        name: "Market outlook 2026",
        datePublished: "2026-01-15",
        publisher: { "@type": "Organization", name: "QKS Group" },
      },
      { "@type": "FAQPage", mainEntity: faqEntities },
      {
        "@type": "BreadcrumbList",
        itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://example.github.io/qks-ai-sdlc-demo/" }],
      },
    ],
  });
  const jsonLd = overrides.jsonLd ?? defaultJsonLd;

  return `
<body>
  <header><a href="/">QKS Group</a></header>
  <main>
    <h1>Market outlook 2026</h1>
    ${answer === null ? "" : `<p data-answer="short">${answer}</p>`}
    <ul data-key-facts>
      <li>Market size: 4.2 billion</li>
      <li>Growth rate: 9 percent a year</li>
      <li>Region leader: Europe</li>
      <li>Forecast horizon: 2030</li>
    </ul>
    <h2>Methodology</h2>
    <p>Sources and approach.</p>
    <section data-faq>${faqItems}
    </section>
    <img src="/chart.svg" alt="Market growth chart">
  </main>
  <script type="application/ld+json">${jsonLd}</script>
</body>
</html>`;
};

const homeFixture = `${head()}
<body>
  <h1>QKS Group demo</h1>
  <img src="/qks-logo-light.svg" alt="QKS Group">
</body>
</html>`;

const validReport = `${head()}${reportBody()}`;

const brokenReport = `${head()}${reportBody({
  answer: null,
  faqCount: 2,
  jsonLd: '{"@type": "Report", "name": "Market outlook 2026",',
})}`;

const failingIds = (results: { id: string; pass: boolean }[]) =>
  results.filter((r) => !r.pass).map((r) => r.id).sort();

describe("seo-check checkPage", () => {
  it("passes every check on a valid report page", () => {
    const results = checkPage(validReport, "report");
    expect(failingIds(results)).toEqual([]);
    expect(results.length).toBeGreaterThan(0);
  });

  it("fails exactly the expected checks on a broken report page", () => {
    const results = checkPage(brokenReport, "report");
    expect(failingIds(results)).toEqual(
      [
        "aeo-faq-items",
        "aeo-faq-schema",
        "aeo-short-answer",
        "geo-breadcrumb",
        "geo-jsonld-valid",
        "geo-report-schema",
      ].sort(),
    );
  });

  it("passes every home check on a valid home page", () => {
    const results: { id: string; group: string; pass: boolean }[] = checkPage(homeFixture, "home");
    expect(failingIds(results)).toEqual([]);
    expect(results.every((r) => r.group === "SEO" || r.group === "DEMO")).toBe(true);
  });
});
