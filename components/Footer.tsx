import { asset } from "@/lib/env";

const columns: { heading: string; links: string[] }[] = [
  {
    heading: "For Vendors",
    links: ["SPARK Matrix™", "AI Maturity Matrix™", "GTM Validation Advisory", "Business Case Validation"],
  },
  {
    heading: "Enterprise Advisory",
    links: ["SPARK Plus™", "Enterprise Transformation", "Technology Portfolio Advisory", "Technology Sourcing Advisory"],
  },
  {
    heading: "Resources",
    links: ["Library", "Newsroom", "Events & Webinars"],
  },
  {
    heading: "What Drives Us",
    links: ["About Us", "Our Story", "How We Work"],
  },
];

const aiChips = ["ChatGPT", "Claude", "Grok", "Perplexity", "Gemini"];

const legalLinks = ["Terms & Use", "Privacy Policy", "Cookie Policy", "Return & Refund Policy"];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={asset("/qks-logo-light.svg")} alt="QKS Group" height={56} />
            <address>
              Quadrant Knowledge Solutions Pvt Ltd, 5th Floor, Wing 2, Cluster C, EON Free Zone, Kharadi, Pune,
              Maharashtra 411014
            </address>
            <p className="footer-email">support@qksgroup.com</p>
          </div>

          <div className="footer-columns">
            {columns.map((col) => (
              <div className="footer-col" key={col.heading}>
                <h2 className="footer-heading">{col.heading}</h2>
                <ul>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-ai">
          <span className="footer-ai-label">Ask AI about QKS Group</span>
          <ul className="ai-chips">
            {aiChips.map((chip) => (
              <li key={chip}>
                <a href="#" className="ai-chip">
                  {chip}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-bottom">
          <p className="copyright">2026 © Quadrant Knowledge Solutions Pvt Ltd</p>
          <ul className="legal-links">
            {legalLinks.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
          <p className="demo-note">Demo replica built by Vayasoft</p>
        </div>
      </div>
    </footer>
  );
}
