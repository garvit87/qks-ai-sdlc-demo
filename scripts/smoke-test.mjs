#!/usr/bin/env node
// Poll a URL every 10 s for up to 240 s until it returns HTTP 200 and the body
// contains the given text.
//
//   node scripts/smoke-test.mjs <url> <must-contain-text>

const [url, text] = process.argv.slice(2);

if (!url || text === undefined) {
  console.error("Usage: node scripts/smoke-test.mjs <url> <must-contain-text>");
  process.exit(1);
}

const INTERVAL_MS = 10_000;
const TIMEOUT_MS = 240_000;
const started = Date.now();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Cache-buster so GitHub Pages' CDN cannot serve a stale copy for minutes.
const target = `${url}${url.includes("?") ? "&" : "?"}smoke=${started}`;

for (let attempt = 1; ; attempt++) {
  const elapsed = Math.round((Date.now() - started) / 1000);
  let status = "error";
  let note;
  let found = false;

  try {
    const res = await fetch(target, {
      redirect: "follow",
      headers: { "cache-control": "no-cache" },
      signal: AbortSignal.timeout(15_000),
    });
    status = res.status;
    const body = await res.text();
    found = res.status === 200 && body.includes(text);
    note = found ? "text found" : res.status === 200 ? "text not found" : "not HTTP 200";
  } catch (err) {
    note = err.cause?.code ?? err.message;
  }

  console.log(`[attempt ${attempt}, +${elapsed}s] HTTP ${status} · ${note}`);

  if (found) {
    console.log(`Smoke test passed: ${url} contains "${text}"`);
    process.exit(0);
  }
  if (Date.now() - started >= TIMEOUT_MS) break;
  await sleep(INTERVAL_MS);
}

console.error(`Smoke test failed: ${url} did not return HTTP 200 containing "${text}" within 240 s`);
process.exit(1);
