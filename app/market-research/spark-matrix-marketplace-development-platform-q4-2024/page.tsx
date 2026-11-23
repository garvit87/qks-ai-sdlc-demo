import type { Metadata } from "next";
import Link from "next/link";
import "../report.css";
import { report } from "@/lib/reports/marketplace-development-platform";
import { reportJsonLd } from "@/lib/structuredData";

const CANONICAL_PATH =
  "/market-research/spark-matrix-marketplace-development-platform-q4-2024/";
const SITE_URL = (process.env.SITE_URL || "http://localhost:4000").replace(/\/$/, "");
const PAGE_URL = `${SITE_URL}${CANONICAL_PATH}`;

export const metadata: Metadata = {
  title: "SPARK Matrix™: Marketplace Development Platform Q4 2024 | QKS",
  description:
    "Short answer, key facts and FAQ for QKS Group's SPARK Matrix™ report on marketplace development platforms, Q4 2024. 14 vendors; the full report is paid.",
  alternates: { canonical: CANONICAL_PATH },
  robots: { index: false, follow: false },
  openGraph: {
    title: "SPARK Matrix™: Marketplace Development Platform Q4 2024 | QKS",
    description:
      "Short answer, key facts and FAQ for QKS Group's SPARK Matrix™ report on marketplace development platforms, Q4 2024. 14 vendors; the full report is paid.",
    type: "article",
  },
};

const PUBLISHED_LABEL = "15 November 2024";

export default function ReportPage() {
  const jsonLd = JSON.stringify(reportJsonLd(report, PAGE_URL)).replace(
    /</g,
    "\\u003c",
  );

  return (
    <div className="rp-page">
      <nav className="rp-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="#">Research Library</Link>
          </li>
          <li aria-current="page">Marketplace Development Platform</li>
        </ol>
      </nav>

      <header className="rp-header">
        <div className="rp-header-inner">
          <ul className="rp-tags">
            <li>{report.domain}</li>
            <li>{report.subDomain}</li>
          </ul>
          <h1>{report.title}</h1>
          <p className="rp-meta">
            Published {PUBLISHED_LABEL} · Analyst: {report.analyst.name}
          </p>
        </div>
      </header>

      <div className="rp-container">
        <section
          className="rp-short-answer"
          data-answer="short"
          aria-label="Short answer"
        >
          <svg
            className="rp-short-answer-icon"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M12 7v6M12 16.5v.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div>
            <p className="rp-short-answer-label">In short</p>
            <p className="rp-short-answer-text">{report.shortAnswer}</p>
          </div>
        </section>

        <div className="rp-layout">
          <div className="rp-main">
            <h2>Key facts</h2>
            <ul className="rp-key-facts" data-key-facts>
              {report.keyFacts.map((fact) => (
                <li key={fact.label}>
                  <span className="rp-fact-label">{fact.label}:</span>{" "}
                  <span className="rp-fact-value">{fact.value}</span>
                </li>
              ))}
            </ul>

            <h2>What this report covers</h2>
            {report.coverage.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="rp-chips" aria-label="Vendors evaluated">
              {report.vendors.map((vendor) => (
                <li key={vendor}>{vendor}</li>
              ))}
            </ul>

            <h2>Table of contents</h2>
            <ol className="rp-toc">
              {report.toc.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>

            <h2>Frequently asked questions</h2>
            <div className="rp-faq" data-faq>
              {report.faq.map((item, index) => (
                <details
                  key={item.q}
                  className="rp-faq-item"
                  data-faq-item
                  open={index === 0}
                >
                  <summary className="rp-faq-q" data-faq-q>
                    {item.q}
                  </summary>
                  <div className="rp-faq-a" data-faq-a>
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <aside className="rp-buy" aria-label="Purchase">
            <p className="rp-price">US${report.priceUSD.toLocaleString("en-US")}</p>
            <button
              type="button"
              className="rp-btn rp-btn-primary"
              disabled
              title="Disabled in demo"
            >
              Buy Now
            </button>
            <button
              type="button"
              className="rp-btn rp-btn-outline"
              disabled
              title="Disabled in demo"
            >
              Add to Cart
            </button>
            <p className="rp-buy-note">
              The full report remains a paid publication.
            </p>
          </aside>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />

        <p className="rp-footnote">
          Page prepared by Vayasoft&apos;s AI agent for ticket KAN-4 · demo
          content based on the public report listing
        </p>
      </div>
    </div>
  );
}
