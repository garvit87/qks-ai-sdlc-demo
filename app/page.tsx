import type { Metadata } from "next";
import Link from "next/link";
import MatrixChart from "@/components/MatrixChart";
import "./spark-matrix.css";

const title = "SPARK Matrix™ | Technology Vendor Evaluation | QKS Group";
const description =
  "SPARK Matrix™ by QKS Group ranks technology vendors on Technology Excellence and Customer Impact, with global, regional and industry evaluations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    siteName: "QKS Group",
    type: "website",
  },
};

const trustedBy: { initials: string; quote: string; name: string; role: string }[] = [
  {
    initials: "JB",
    quote: "“Comprehensive analysis and practical insights.”",
    name: "John Bates",
    role: "CEO, SER Group",
  },
  {
    initials: "AC",
    quote: "“Consistently impressed by the depth and quality of their analysis.”",
    name: "Annie Cashman",
    role: "Principal, Analyst Relations, Trintech",
  },
  {
    initials: "ND",
    quote: "“Expertise and professionalism, consistently.”",
    name: "Nicole Diceman",
    role: "Director Product Marketing, Vena Solutions",
  },
  {
    initials: "MM",
    quote: "“Enhanced our market credibility significantly.”",
    name: "Melon Marta",
    role: "Analyst Relation and Global Manager, GFT Technologies",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero */}
      <section className="sm-hero">
        <span className="sm-blob sm-blob--a" aria-hidden="true" />
        <span className="sm-blob sm-blob--b" aria-hidden="true" />
        <div className="sm-hero-inner">
          <h1 className="sm-hero-title">SPARK Matrix™ – Strategic Performance Assessment and Ranking</h1>
          <p className="sm-hero-lead">
            A quadrant-based evaluation framework that empowers decision-makers with deep, data-driven insights into
            vendor performance across innovation, customer impact, and market relevance.
          </p>
          <div className="sm-hero-actions">
            <Link
              href="/market-research/spark-matrix-marketplace-development-platform-q4-2024/"
              prefetch={false}
              className="sm-btn sm-btn--solid"
            >
              Explore Reports
            </Link>
            <a href="#" className="sm-btn sm-btn--outline">
              Talk to Analyst
            </a>
          </div>
          <div className="sm-tablet">
            <div className="sm-tablet-screen">
              <MatrixChart size="large" title="SPARK Matrix™: Strategic Performance Assessment and Ranking" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. What is SPARK Matrix */}
      <section className="sm-what">
        <div className="sm-container">
          <div className="sm-what-col">
            <h2 className="sm-h2">What is SPARK Matrix™?</h2>
            <span className="sm-underline" aria-hidden="true" />
            <p>
              <strong>SPARK Matrix™</strong> (Strategic Performance Assessment and Ranking) is QKS Group’s proprietary
              evaluation framework designed to analyze and rank technology vendors based on two critical dimensions:
            </p>
            <ul className="sm-dims">
              <li>Technology Excellence</li>
              <li>Customer Impact</li>
            </ul>
            <p>
              It provides a visual and strategic comparison of leading solution providers, making it easier for
              businesses to identify the right technology partners aligned with their goals.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Regional SPARK Matrix */}
      <section className="sm-section">
        <div className="sm-container sm-split">
          <div className="sm-carousel">
            <div className="sm-carousel-card">
              <MatrixChart size="small" title="SPARK Matrix™: Market Name North America, 20XX" />
            </div>
            <span className="sm-arrow sm-arrow--prev" aria-hidden="true">
              ‹
            </span>
            <span className="sm-arrow sm-arrow--next" aria-hidden="true">
              ›
            </span>
          </div>
          <div className="sm-split-copy">
            <span className="sm-tag">The Only Analyst Firm Delivering Regional Market Clarity</span>
            <h2 className="sm-h2" style={{ marginTop: 20 }}>
              Regional SPARK Matrix™
            </h2>
            <span className="sm-underline" aria-hidden="true" />
            <p>
              QKS Group is the only analyst firm in the world that produces dedicated SPARK Matrix™ evaluations for key
              global regions.
            </p>
            <p>
              We recognize that buyer needs, vendor maturity, and competitive landscapes vary across markets and so
              should your vendor intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Industry SPARK Matrix */}
      <section className="sm-section">
        <div className="sm-container sm-split sm-split--mirror">
          <div className="sm-split-copy">
            <span className="sm-tag">Domain-Driven Insights for Industry-Specific Decision Making</span>
            <h2 className="sm-h2" style={{ marginTop: 20 }}>
              Industry SPARK Matrix™
            </h2>
            <span className="sm-underline" aria-hidden="true" />
            <p>
              Our Industry SPARK Matrix™ delivers targeted analysis based on the real-world operational and compliance
              needs unique to each sector.
            </p>
          </div>
          <div className="sm-carousel sm-split-chart">
            <div className="sm-carousel-card">
              <MatrixChart size="small" title="SPARK Matrix™: Market Name Manufacturing, 20XX" />
            </div>
            <span className="sm-arrow sm-arrow--prev" aria-hidden="true">
              ‹
            </span>
            <span className="sm-arrow sm-arrow--next" aria-hidden="true">
              ›
            </span>
          </div>
        </div>
      </section>

      {/* 5. How does SPARK Matrix stand out */}
      <section className="sm-section">
        <div className="sm-stand">
          <div className="sm-stand-grid">
            <div>
              <h2 className="sm-h2">How Does SPARK Matrix™ Stand Out?</h2>
              <p className="sm-stand-intro">A Framework Built for Clarity and Credibility.</p>
              <p className="sm-stand-text">
                SPARK Matrix™ is more than a quadrant, it’s a multi-dimensional market positioning tool built to reflect
                the realities of modern B2B tech evaluation. Here’s what makes it unique:
              </p>
            </div>
            <div>
              <article className="sm-glass">
                <h3>3x2 Strategic Matrix Design</h3>
                <p>Unlike traditional 2x2 grids, SPARK Matrix™ uses a 3x2 quadrant structure, categorizing vendors into:</p>
                <ul>
                  <li>
                    <strong>Leaders &amp; Emerging Leaders</strong> – High Technology Excellence &amp; High Customer Impact
                  </li>
                  <li>
                    <strong>Contenders &amp; Strong Contenders</strong> – Strong potential with growing customer traction
                  </li>
                  <li>
                    <strong>Aspirants</strong> – Emerging players still developing key capabilities
                  </li>
                </ul>
                <p>This layered structure enables a more nuanced and realistic vendor assessment.</p>
              </article>
              <article className="sm-glass">
                <h3>Unique Recognitions</h3>
                <p>We go beyond the matrix with analyst-recognized categories:</p>
                <ul>
                  <li>
                    <strong>Emerging Innovator</strong> – Recognizes vendors bringing disruptive innovation despite limited
                    current adoption.
                  </li>
                  <li>
                    <strong>Ace Performer</strong> – Highlights vendors delivering exceptional customer satisfaction or
                    performance in specific regional or industry segments.
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Badges */}
      <section className="sm-section sm-badges">
        <span className="sm-badges-glow" aria-hidden="true" />
        <div className="sm-badges-inner">
          <span className="sm-tag">Stand out in a crowded market.</span>
          <h2 className="sm-h2 sm-h2--center" style={{ marginTop: 20 }}>
            SPARK Matrix™ Badges: A Mark of Leadership
          </h2>
          <p className="sm-lead">
            Vendors featured in the SPARK Matrix™ receive exclusive digital badges that signify their ranking across
            global, regional, and industry-specific matrices. These badges serve as trusted symbols of excellence,
            credibility, and innovation
          </p>
          <div className="sm-badge-row">
            <figure className="sm-badge-item">
              <div className="sm-badge-card">
                <div className="sm-badge sm-badge--leader">
                  <div className="sm-badge-band">
                    <span className="sm-badge-logo">QKS Group</span>
                    <span className="sm-badge-year">SPARK Matrix™ 2025</span>
                  </div>
                  <div className="sm-badge-ribbon">Leader</div>
                  <div className="sm-badge-body">
                    <strong>Vendor Name</strong>
                    <span>
                      Named as a <em>Leader</em> in
                    </span>
                    <span>Market Name</span>
                  </div>
                </div>
                <p className="sm-badge-caption">Leadership badge</p>
              </div>
            </figure>
            <figure className="sm-badge-item">
              <div className="sm-badge-card">
                <div className="sm-badge sm-badge--ace">
                  <div className="sm-badge-band">
                    <span className="sm-badge-logo">QKS Group</span>
                    <span className="sm-badge-year">SPARK Matrix™ 2025</span>
                  </div>
                  <div className="sm-badge-ribbon">Ace Performer</div>
                  <div className="sm-badge-body">
                    <strong>Vendor Name</strong>
                    <span>
                      Named as an <em>Ace Performer</em> in
                    </span>
                    <span>Market Name</span>
                  </div>
                </div>
                <p className="sm-badge-caption">Ace Performer</p>
              </div>
            </figure>
            <figure className="sm-badge-item">
              <div className="sm-badge-card">
                <div className="sm-badge sm-badge--innovator">
                  <div className="sm-badge-band">
                    <span className="sm-badge-logo">QKS Group</span>
                    <span className="sm-badge-year">SPARK Matrix™ 2025</span>
                  </div>
                  <div className="sm-badge-ribbon">Emerging Innovator</div>
                  <div className="sm-badge-body">
                    <strong>Vendor Name</strong>
                    <span>
                      Named as an <em>Emerging Innovator</em> in
                    </span>
                    <span>Market Name</span>
                  </div>
                </div>
                <p className="sm-badge-caption">Emerging Innovator</p>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 7. Global ranking */}
      <section className="sm-section sm-rank">
        <div className="sm-container sm-split">
          <div className="sm-rank-copy">
            <span className="sm-tag">Ranked #2 Globally for Vendor Reprints</span>
            <h2 className="sm-h2" style={{ marginTop: 20 }}>
              Global Ranking
            </h2>
            <span className="sm-underline" aria-hidden="true" />
            <p>
              QKS Group is the <strong>#2 most referenced analyst firm in the world by reprint volume, just after</strong>{" "}
              Gartner and ahead of Forrester.
            </p>
            <p>
              Our SPARK Matrix™ reports are consistently licensed and redistributed by top vendors to build buyer trust,
              strengthen their GTM, and support analyst-backed selling.
            </p>
            <p className="sm-source">
              Source: QKS Group analysis, 2024. Based on vendor-licensed reprints and publicly available reprint data.
            </p>
          </div>
          <div
            className="sm-rank-card"
            role="img"
            aria-label="Horizontal bar chart, Global Evaluation Matrices in Tech Advisory: Magic Quadrant at 80 percent, SPARK Matrix at 65 percent, Forrester Wave at 50 percent. SPARK Matrix is ranked between the two other matrices by reprint volume."
          >
            <p className="sm-rank-card-title">Global Evaluation Matrices in Tech Advisory</p>
            <div className="sm-hbars">
              <div className="sm-hbar" style={{ width: "80%", background: "#ffffff" }}>
                <span className="sm-hbar-label">Magic Quadrant</span>
              </div>
              <div className="sm-hbar sm-hbar--spark" style={{ width: "65%" }}>
                <span className="sm-hbar-label">SPARK Matrix™</span>
              </div>
              <div className="sm-hbar" style={{ width: "50%", background: "#ffffff" }}>
                <span className="sm-hbar-label">Forrester Wave</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Research methodology */}
      <section className="sm-section">
        <div className="sm-container sm-split">
          <div className="sm-method-card">
            <span className="sm-method-dot sm-method-dot--a" aria-hidden="true" />
            <span className="sm-method-dot sm-method-dot--b" aria-hidden="true" />
            <div className="sm-method-card-inner">
              <p className="sm-method-card-title">Confident Decisions Start with SPARK.</p>
              <p className="sm-method-card-text">
                Evaluate technology. Benchmark performance. Build credibility.
                <br />
                Explore the world’s second-most referenced analyst reports.
              </p>
            </div>
          </div>
          <div className="sm-method-copy">
            <h2 className="sm-h2">Research Methodology</h2>
            <span className="sm-underline" aria-hidden="true" />
            <p className="sm-method-q">Curious about our evaluation criteria?</p>
            <p>
              Our methodology blends vendor briefings, customer references, market intelligence, and proprietary scoring
              frameworks.
            </p>
            <a href="#" className="sm-btn sm-btn--outline">
              View Research Methodology
            </a>
          </div>
        </div>
      </section>

      {/* 9. Trusted by leading global vendors */}
      <section className="sm-section">
        <div className="sm-container">
          <h2 className="sm-h2 sm-h2--center">Trusted by Leading Global Vendors</h2>
          <p className="sm-lead" style={{ textAlign: "center", marginTop: 16 }}>
            Global leaders trust QKS Group to deliver insights that drive growth, innovation, and competitive advantage.
          </p>
          <div className="sm-quotes">
            {trustedBy.map((t) => (
              <figure className="sm-quote" key={t.name} style={{ margin: 0 }}>
                <span className="sm-avatar" aria-hidden="true">
                  {t.initials}
                </span>
                <blockquote className="sm-quote-text" style={{ margin: 0 }}>
                  {t.quote}
                </blockquote>
                <figcaption className="sm-quote-meta">
                  <strong>{t.name}</strong>
                  {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="sm-dots" aria-hidden="true">
            <span className="sm-dot" />
            <span className="sm-dot" />
            <span className="sm-dot" />
            <span className="sm-dot sm-dot--active" />
          </div>
        </div>
      </section>
    </main>
  );
}
