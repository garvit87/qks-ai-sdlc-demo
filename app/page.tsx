import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";

const featured: { title: string; desc: string; icons: IconName[]; soon?: boolean }[] = [
  {
    title: "SPARK Matrix™",
    desc: "Independent technology evaluation that makes vendor positioning, technology excellence and customer impact clear.",
    icons: ["chart", "bars", "trend"],
  },
  {
    title: "SPARK Plus™",
    desc: "Extend research into action with analyst access, advisory and intelligence built around your business priorities.",
    icons: ["users", "chat", "doc"],
  },
  {
    title: "AI Maturity Matrix™",
    desc: "Understand AI maturity and market differentiation with a structured, evidence-led perspective.",
    icons: ["trend", "chart", "doc"],
  },
  {
    title: "ROI Benchmarks",
    desc: "Pressure-test assumptions and validate the business case behind technology investment decisions.",
    icons: ["bars", "trend", "doc"],
  },
  {
    title: "QKS Intelligence™",
    desc: "Track market movements and competitive signals as they happen.",
    icons: ["trend", "chat", "bars"],
  },
  {
    title: "VOC Insights",
    desc: "Customer sentiment analysis across technology markets.",
    icons: ["chat", "users", "doc"],
    soon: true,
  },
];

const advisoryRows: { title: string; audience: string }[] = [
  { title: "AI Transformation", audience: "CAIO · CDO" },
  { title: "Cyber Resilience", audience: "CISO" },
  { title: "Enterprise Transformation", audience: "CIO" },
  { title: "Technology Portfolio", audience: "CIO · CTO" },
  { title: "Customer Transformation", audience: "CMO" },
  { title: "GRC Transformation", audience: "CRO · CCO" },
  { title: "Technology Sourcing Advisory", audience: "Vendor selection" },
  { title: "Advisory Membership", audience: "Every market, on call" },
];

const vendorCards: { title: string; body: string }[] = [
  {
    title: "GTM Validation Advisory",
    body: "Validate your growth strategy before you fund it.",
  },
  {
    title: "Competitive & Market Intelligence",
    body: "Understand where you stand and where the market moves.",
  },
  {
    title: "Business Case Validation",
    body: "Build an ROI story your buyers can believe.",
  },
  {
    title: "Start with an Analyst",
    body: "Bring a question. Get an evidence-led answer.",
  },
];

const principles: { title: string; body: string }[] = [
  { title: "01 / Disclose", body: "Transparent relationships" },
  { title: "02 / Separate", body: "Research sign-off" },
  { title: "03 / Evidence", body: "Evidence over influence" },
  { title: "04 / Correct", body: "Accountability on record" },
];

const resources: { title: string; href: string }[] = [
  {
    title: "Research Library",
    href: "/market-research/spark-matrix-marketplace-development-platform-q4-2024/",
  },
  { title: "Newsroom", href: "#" },
  { title: "Industry Insights", href: "#" },
  { title: "Events & Webinars", href: "#" },
];

const formFields: { id: string; label: string; type: string; required?: boolean; wide?: boolean }[] = [
  { id: "f-name", label: "Name", type: "text" },
  { id: "f-email", label: "Email *", type: "email", required: true },
  { id: "f-job", label: "Job Title", type: "text" },
  { id: "f-company", label: "Company Name", type: "text" },
  { id: "f-country", label: "Country", type: "text" },
];

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero */}
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow eyebrow--hero">A wider view of the technology ecosystem</p>
          <h1 className="hero-title">
            Make your next technology decision the one that <span className="hero-accent">moves you forward.</span>
          </h1>
          <p className="hero-lead">
            From market positioning to enterprise transformation, QKS Group turns independent research into decisions
            you can stand behind and action you can measure.
          </p>
          <a href="#" className="btn btn-white">
            Explore Our Offerings →
          </a>
          <ul className="hero-stats">
            <li className="stat">
              <span className="stat-num">220+</span>
              <span className="stat-label">Major ICT Markets</span>
            </li>
            <li className="stat">
              <span className="stat-num">400+</span>
              <span className="stat-label">Technologies tracked</span>
            </li>
            <li className="stat">
              <span className="stat-num">3,000+</span>
              <span className="stat-label">Software innovators tracked</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Two audiences */}
      <section className="section section--tint">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">Two sides of the technology ecosystem</p>
            <h2>Different challenges. One independent perspective.</h2>
            <p className="section-sub">
              QKS Group helps the buyers and the builders of technology see the market clearly and act with confidence.
            </p>
          </header>
          <div className="audience-grid">
            <article className="audience-card">
              <span className="audience-circles" aria-hidden="true" />
              <p className="audience-tag audience-tag--green">For Enterprises Ready to Transform.</p>
              <h3>For leaders accountable for transformation.</h3>
              <p className="audience-body">
                Navigate AI, cyber resilience, technology strategy and sourcing with research-backed, vendor-independent
                guidance.
              </p>
              <a href="#" className="text-link">
                Explore Enterprise Advisory →
              </a>
            </article>
            <article className="audience-card">
              <span className="audience-circles" aria-hidden="true" />
              <p className="audience-tag audience-tag--blue">For technology vendors ready to lead</p>
              <h3>For innovators ready to shape the market.</h3>
              <p className="audience-body">
                Validate your go-to-market strategy, sharpen competitive positioning, and build a business case backed by
                evidence.
              </p>
              <a href="#" className="text-link">
                Explore Vendor Services →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* 3. Featured offerings */}
      <section className="section">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">Featured offerings</p>
            <h2>Insight is the beginning. Impact is the point.</h2>
            <p className="section-sub">A connected set of research frameworks, market intelligence and advisory tools.</p>
          </header>
          <div className="offer-grid">
            {featured.map((item) => (
              <article className="offer-card" key={item.title}>
                <div className="icon-cluster">
                  {item.icons.map((icon, i) => (
                    <span className="icon-tile" key={`${icon}-${i}`}>
                      <Icon name={icon} size={22} />
                    </span>
                  ))}
                </div>
                <h3 className="offer-title">{item.title}</h3>
                <p className="offer-desc">{item.desc}</p>
                {item.soon && <span className="pill-soon">Coming soon</span>}
                <a href="#" className="arrow-btn" aria-label={`Explore ${item.title}`}>
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Enterprise Advisory */}
      <section className="section section--dark">
        <div className="container">
          <header className="section-head section-head--dark">
            <p className="eyebrow eyebrow--light">Enterprise Advisory</p>
            <h2>Move from transformation ambition to measurable progress.</h2>
            <p className="section-sub">
              Independent advice for consequential technology decisions, from assessment through execution.
            </p>
            <a href="#" className="btn btn-outline">
              Talk to a Practitioner
            </a>
          </header>
          <ul className="advisory-list">
            {advisoryRows.map((row) => (
              <li className="advisory-row" key={row.title}>
                <span className="advisory-title">{row.title}</span>
                <span className="advisory-audience">{row.audience}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. For technology vendors */}
      <section className="section section--tint">
        <div className="container">
          <header className="section-head">
            <h2>Make your market position mean more.</h2>
            <p className="section-sub">
              Evidence-backed advisory on strategy, the competitive landscape and how you communicate business value.
            </p>
          </header>
          <div className="vendor-grid">
            {vendorCards.map((card) => (
              <article className="vendor-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. How we work */}
      <section className="section">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">How we work</p>
            <h2>Independence is not a claim. It is a set of mechanisms.</h2>
          </header>
          <ol className="principles">
            {principles.map((p) => (
              <li className="principle" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
          <div className="principles-close">
            <p className="principles-line">One standard across both sides of the ecosystem.</p>
            <a href="#" className="btn btn-outline btn-outline--dark">
              Read How We Work
            </a>
          </div>
        </div>
      </section>

      {/* 7. Resource hub */}
      <section className="section section--tint">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">Explore QKS Group</p>
            <h2>Go deeper on the questions that matter to you.</h2>
          </header>
          <div className="resource-grid">
            {resources.map((r) =>
              r.href.startsWith("/") ? (
                <Link className="resource-card" href={r.href} key={r.title}>
                  {r.title}
                </Link>
              ) : (
                <a className="resource-card" href={r.href} key={r.title}>
                  {r.title}
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 8. Contact */}
      <section className="section section--contact">
        <div className="container container--narrow">
          <header className="section-head">
            <p className="eyebrow">Your next step starts here</p>
            <h2>Bring us the decision you need to get right.</h2>
          </header>
          <form className="contact-form" aria-label="Contact QKS Group">
            <div className="form-grid">
              {formFields.map((f) => (
                <div className="form-field" key={f.id}>
                  <label htmlFor={f.id}>{f.label}</label>
                  <input id={f.id} name={f.id} type={f.type} required={f.required} />
                </div>
              ))}
              <div className="form-field form-field--wide">
                <label htmlFor="f-reason">Reason</label>
                <textarea id="f-reason" name="reason" rows={4} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled title="Disabled in demo">
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
