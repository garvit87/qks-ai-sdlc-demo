#!/usr/bin/env node
// Jira Cloud REST v2 helper used by the CI/CD workflows.
//
//   node scripts/jira.mjs comment <ISSUE-KEY> <markdown-file>   (Jira wiki markup in the file)
//   node scripts/jira.mjs transition <ISSUE-KEY> "<Status name>"
//
// Env: JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN. Missing config or key -> skip, exit 0.
// Jira problems are logged as warnings and never fail the pipeline.

import { readFileSync } from "node:fs";

const [, , command, key, arg] = process.argv;
const { JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN } = process.env;

const skip = (message) => {
  console.log(message);
  process.exit(0);
};

if (!JIRA_BASE_URL || !JIRA_EMAIL || !JIRA_API_TOKEN) skip("Jira not configured — skipping");
if (!key) skip("No Jira key — skipping");

if (!/^[A-Z][A-Z0-9]+-[0-9]+$/.test(key)) {
  console.warn(`Warning: "${key}" is not a Jira issue key — skipping`);
  process.exit(0);
}

const base = JIRA_BASE_URL.replace(/\/+$/, "");
const headers = {
  Authorization: "Basic " + Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64"),
  Accept: "application/json",
  "Content-Type": "application/json",
};
const issueUrl = (suffix) => `${base}/rest/api/2/issue/${key}${suffix}`;

async function request(method, url, body) {
  const res = await fetch(url, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${method} ${url.slice(base.length)} failed: HTTP ${res.status} ${text.slice(0, 300)}`);
  }
  return text ? JSON.parse(text) : null;
}

async function comment(file) {
  const body = readFileSync(file, "utf8");
  const created = await request("POST", issueUrl("/comment"), { body });
  console.log(`Created Jira comment ${created.id} on ${key}`);
}

async function transition(target) {
  const { transitions = [] } = await request("GET", issueUrl("/transitions"));
  const wanted = target.trim().toLowerCase();
  const match = transitions.find(
    (t) => t.name?.toLowerCase() === wanted || t.to?.name?.toLowerCase() === wanted,
  );
  if (!match) {
    const available = transitions.map((t) => t.name ?? t.to?.name).join(", ") || "none";
    console.warn(`Warning: no transition "${target}" available for ${key}. Available: ${available}`);
    return;
  }
  await request("POST", issueUrl("/transitions"), { transition: { id: match.id } });
  console.log(`Transitioned ${key} via "${match.name}" to "${match.to?.name ?? match.name}"`);
}

const usage = () => {
  console.error('Usage: jira.mjs comment <KEY> <file> | transition <KEY> "<Status>"');
  process.exit(2);
};

try {
  if (command === "comment" && arg) await comment(arg);
  else if (command === "transition" && arg) await transition(arg);
  else usage();
} catch (err) {
  console.warn(`Warning: Jira ${command} failed for ${key}: ${err.message}`);
}
process.exit(0);
