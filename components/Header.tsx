import Link from "next/link";
import { asset } from "@/lib/env";

const navItems = ["What Drives Us", "For Vendors", "Enterprise Advisory", "Resources"];

function Chevron() {
  return (
    <svg className="chevron" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" focusable="false">
      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-util">
        <a href="#">QKS Library</a>
        <a href="#">Newsroom</a>
        <a href="#">Sign In</a>
      </div>
      <div className="header-main">
        <Link href="/" className="header-logo">
          <img src={asset("/qks-logo-dark.svg")} alt="QKS Group" height={40} />
        </Link>
        <nav className="header-nav" aria-label="Main">
          <ul>
            {navItems.map((item) => (
              <li key={item}>
                <a href="#">
                  {item}
                  <Chevron />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#" className="btn btn-primary header-cta">
          Become A Client
        </a>
      </div>
    </header>
  );
}
