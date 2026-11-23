# QKS AI-SDLC demo

A demo replica of the QKS Group homepage, used by Vayasoft to show AI-assisted delivery on a CI/CD pipeline.
**It is not the live qksgroup.com.** Every page carries a "Demo replica" banner and is hidden from search engines (`noindex` + `robots.txt`).

## The flow this repo demonstrates

| Stage | What happens | Where you see it |
|---|---|---|
| 1. Ticket | QKS raises a Jira ticket in plain English | Jira |
| 2. AI plan | The AI agent posts its plan on the ticket | Jira comment |
| 3. AI build | The agent builds the change on a branch and opens a pull request | GitHub PR, Jira comment "AI agent build ready" |
| 4. Engineer review | A Vayasoft engineer reviews and adds the `engineer-approved` label | PR, Jira comment |
| 5. CI/CD checks | Type check, unit tests, build, SEO · AEO · GEO checklist, dependency scan, secret scan | GitHub Actions, Jira comment with results |
| 6. Test environment | Deployed to `/test/` and smoke-tested | Test URL, Jira comment |
| 7. Release | After merge, the release waits for approval; once approved it goes live with a release record | GitHub release, Jira "Released to live", ticket Done |

## Local commands

```bash
npm ci
npm run dev          # http://localhost:3000
npm run typecheck
npm test
npm run build && npm run seo-check
```

## Pipeline

- `.github/workflows/pr-opened.yml` — "1 · AI build ready"
- `.github/workflows/checks.yml` — "2 · Engineer review → CI/CD checks → Test environment" (runs when the `engineer-approved` label is added)
- `.github/workflows/release.yml` — "3 · Release to live" (runs on merge to main; waits for approval on the `production` environment)
- `scripts/seo-check.mjs` — the SEO · AEO · GEO checklist (25 checks across the two pages)
- `scripts/jira.mjs` — posts stage updates to Jira (needs secrets `JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN`; skips quietly without them)

Built by Vayasoft Solutions Private Limited.
