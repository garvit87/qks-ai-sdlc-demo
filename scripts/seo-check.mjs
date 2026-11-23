#!/usr/bin/env node
// SEO · AEO · GEO checklist for the static export.
//
//   node scripts/seo-check.mjs [--dir <path>]     (default dir: out)
//
// Reads seo-pages.json (from <dir> if present, else from the repo root),
// checks each built page, prints a table, writes seo-report.json to the
// current directory, appends a Markdown summary to $GITHUB_STEP_SUMMARY and
// exits 1 if any check fails.

import { readFileSync, existsSync, appendFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as cheerio from "cheerio";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

const toArray = (value) => (Array.isArray(value) ? value : value ? [value] : []);

const hasType = (node, type) => {
  const t = node?.["@type"];
  return Array.isArray(t) ? t.includes(type) : t === type;
};

// Parse every application/ld+json script. Invalid blocks are reported, not thrown.
function readJsonLd($) {
  return $('script[type="application/ld+json"]')
    .toArray()
    .map((el) => {
      const raw = $(el).text();
      try {
        return { ok: true, data: JSON.parse(raw) };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    });
}

// Support a top-level object, an array, or an object with @graph.
function flattenNodes(data) {
  if (Array.isArray(data)) return data.flatMap(flattenNodes);
  if (data && typeof data === "object") {
    const nodes = [data];
    if (data["@graph"]) nodes.push(...flattenNodes(data["@graph"]));
    return nodes;
  }
  return [];
}

export function checkPage(html, type = "home") {
  const $ = cheerio.load(html);
  const results = [];
  const add = (id, group, label, pass, detail) =>
    results.push({ id, group, label, pass: Boolean(pass), detail });

  // ---- SEO (every page) ----
  const title = $("title").first().text().trim();
  add("seo-title", "SEO", "Title present, 30-70 chars", title.length >= 30 && title.length <= 70, `${title.length} chars`);

  const description = ($('meta[name="description"]').attr("content") ?? "").trim();
  add(
    "seo-meta-description",
    "SEO",
    "Meta description 70-170 chars",
    description.length >= 70 && description.length <= 170,
    `${description.length} chars`,
  );

  const h1Count = $("h1").length;
  add("seo-h1", "SEO", "Exactly one h1", h1Count === 1, `${h1Count} h1 elements`);

  const canonical = $('link[rel="canonical"]').attr("href");
  add("seo-canonical", "SEO", "Canonical link present", Boolean(canonical), canonical ?? "missing");

  const lang = $("html").attr("lang");
  add("seo-html-lang", "SEO", "html[lang] set", Boolean(lang && lang.trim()), lang ?? "missing");

  const ogTitle = $('meta[property="og:title"]').attr("content");
  const ogDescription = $('meta[property="og:description"]').attr("content");
  add(
    "seo-og",
    "SEO",
    "og:title and og:description present",
    Boolean(ogTitle && ogDescription),
    `og:title ${ogTitle ? "ok" : "missing"}, og:description ${ogDescription ? "ok" : "missing"}`,
  );

  const images = $("img").toArray();
  const imagesWithoutAlt = images.filter((el) => $(el).attr("alt") === undefined).length;
  add(
    "seo-img-alt",
    "SEO",
    "Every img has an alt attribute",
    imagesWithoutAlt === 0,
    `${imagesWithoutAlt} of ${images.length} img without alt`,
  );

  add("seo-viewport", "SEO", "Viewport meta present", $('meta[name="viewport"]').length > 0, "");

  // ---- DEMO (every page) ----
  const robots = ($('meta[name="robots"]').attr("content") ?? "").toLowerCase();
  add(
    "demo-robots",
    "DEMO",
    "Demo guard: hidden from search engines",
    robots.includes("noindex"),
    robots || "missing",
  );

  if (type !== "report") return results;

  // ---- AEO (report pages) ----
  const allElements = $("*").toArray();
  const shortAnswer = $('[data-answer="short"]').first();
  const shortWords = shortAnswer.length ? countWords(shortAnswer.text()) : 0;
  const firstH2 = $("h2").first().get(0);
  const shortBeforeH2 =
    shortAnswer.length > 0 &&
    (!firstH2 || allElements.indexOf(shortAnswer.get(0)) < allElements.indexOf(firstH2));
  add(
    "aeo-short-answer",
    "AEO",
    "Short answer 20-60 words, before the first h2",
    shortWords >= 20 && shortWords <= 60 && shortBeforeH2,
    shortAnswer.length
      ? `${shortWords} words, ${shortBeforeH2 ? "before" : "after or without"} first h2`
      : "missing [data-answer=\"short\"]",
  );

  const faqItems = $("[data-faq]").find("[data-faq-item]").toArray();
  const incompleteFaqItems = faqItems.filter((el) => {
    const item = $(el);
    return item.find("[data-faq-q]").length === 0 || item.find("[data-faq-a]").length === 0;
  }).length;
  add(
    "aeo-faq-items",
    "AEO",
    "FAQ has >= 3 items, each with question and answer",
    faqItems.length >= 3 && incompleteFaqItems === 0,
    `${faqItems.length} items, ${incompleteFaqItems} incomplete`,
  );

  // ---- GEO (report pages) ----
  const jsonLd = readJsonLd($);
  const nodes = jsonLd.filter((block) => block.ok).flatMap((block) => flattenNodes(block.data));

  const faqPage = nodes.find((node) => hasType(node, "FAQPage"));
  const faqSchemaCount = faqPage ? toArray(faqPage.mainEntity).length : null;
  add(
    "aeo-faq-schema",
    "AEO",
    "FAQPage JSON-LD mainEntity count equals visible FAQ items",
    faqPage !== undefined && faqSchemaCount === faqItems.length,
    faqPage ? `${faqSchemaCount} schema entities, ${faqItems.length} visible items` : "no FAQPage in JSON-LD",
  );

  const keyFacts = $("[data-key-facts]").first();
  const keyFactItems = keyFacts.find("li").length;
  add(
    "geo-key-facts",
    "GEO",
    "Key facts list has >= 4 items",
    keyFacts.length > 0 && keyFactItems >= 4,
    `${keyFactItems} list items`,
  );

  const report = nodes.find((node) => hasType(node, "Report"));
  const reportOk = Boolean(
    report && report.name && report.datePublished && report.publisher?.name === "QKS Group",
  );
  add(
    "geo-report-schema",
    "GEO",
    "Report JSON-LD with name, datePublished and publisher QKS Group",
    reportOk,
    report ? `name ${report.name ? "ok" : "missing"}, datePublished ${report.datePublished ? "ok" : "missing"}, publisher ${report.publisher?.name ?? "missing"}` : "no Report in JSON-LD",
  );

  add(
    "geo-breadcrumb",
    "GEO",
    "BreadcrumbList JSON-LD present",
    nodes.some((node) => hasType(node, "BreadcrumbList")),
    "",
  );

  const invalidBlocks = jsonLd.filter((block) => !block.ok);
  add(
    "geo-jsonld-valid",
    "GEO",
    "Every ld+json script parses as JSON",
    jsonLd.length > 0 && invalidBlocks.length === 0,
    invalidBlocks.length ? `${invalidBlocks.length} invalid: ${invalidBlocks[0].error}` : `${jsonLd.length} blocks`,
  );

  return results;
}

function argValue(flag) {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function loadManifest(dir) {
  const local = join(dir, "seo-pages.json");
  const file = existsSync(local) ? local : join(repoRoot, "seo-pages.json");
  return JSON.parse(readFileSync(file, "utf8"));
}

function printTable(pages) {
  for (const page of pages) {
    console.log(`\n${page.path} (${page.type}): ${page.passed}/${page.total} passed`);
    for (const r of page.results) {
      const status = r.pass ? "PASS" : "FAIL";
      const detail = r.detail ? `  [${r.detail}]` : "";
      console.log(`  ${status}  ${r.group.padEnd(4)}  ${r.id.padEnd(20)} ${r.label}${detail}`);
    }
  }
}

function markdownSummary(report) {
  const lines = [
    "## SEO · AEO · GEO checklist",
    "",
    `**${report.passed}/${report.total} checks passed**`,
    "",
    "| Page | Type | Passed | Failed checks |",
    "| --- | --- | --- | --- |",
  ];
  for (const page of report.pages) {
    const failed = page.results.filter((r) => !r.pass).map((r) => `\`${r.id}\``);
    lines.push(`| \`${page.path}\` | ${page.type} | ${page.passed}/${page.total} | ${failed.join(", ") || "none"} |`);
  }
  return lines.join("\n") + "\n";
}

function main() {
  const dir = argValue("--dir") ?? "out";
  const manifest = loadManifest(dir);

  const pages = manifest.pages.map(({ path, type }) => {
    const file = join(dir, path);
    if (!existsSync(file)) {
      throw new Error(`Built page not found: ${file}`);
    }
    const results = checkPage(readFileSync(file, "utf8"), type);
    return {
      path,
      type,
      results,
      passed: results.filter((r) => r.pass).length,
      total: results.length,
    };
  });

  const passed = pages.reduce((sum, p) => sum + p.passed, 0);
  const total = pages.reduce((sum, p) => sum + p.total, 0);
  const report = { pages, passed, total, ok: passed === total };

  printTable(pages);
  console.log(`\nTotal: ${passed}/${total} checks passed ${report.ok ? "(OK)" : "(FAILED)"}`);

  writeFileSync("seo-report.json", JSON.stringify(report, null, 2) + "\n");

  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdownSummary(report));
  }

  process.exitCode = report.ok ? 0 : 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  try {
    main();
  } catch (err) {
    console.error(`seo-check: ${err.message}`);
    process.exitCode = 1;
  }
}
