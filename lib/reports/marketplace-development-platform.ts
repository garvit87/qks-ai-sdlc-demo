export interface ReportKeyFact {
  label: string;
  value: string;
}

export interface ReportFaqItem {
  q: string;
  a: string;
}

export interface ReportAnalyst {
  name: string;
  role: string;
}

export interface Report {
  slug: string;
  title: string;
  shortTitle: string;
  published: string;
  domain: string;
  subDomain: string;
  priceUSD: number;
  analyst: ReportAnalyst;
  shortAnswer: string;
  keyFacts: ReportKeyFact[];
  coverage: string[];
  vendors: string[];
  toc: string[];
  faq: ReportFaqItem[];
}

export const report: Report = {
  slug: "spark-matrix-marketplace-development-platform-q4-2024",
  title: "SPARK Matrix™: Marketplace Development Platform, Q4 2024",
  shortTitle: "Marketplace Development Platform",
  published: "2024-11-15",
  domain: "Application Platforms & Automation",
  subDomain: "Application Development & Deployment",
  priceUSD: 5000,
  analyst: {
    name: "Sitaparna Roy",
    role: "Analyst, QKS Group",
  },
  shortAnswer:
    "A marketplace development platform is software for creating, managing and scaling multi-vendor online marketplaces, covering multi-vendor support, catalogue and order management, payments and commissions, and partner onboarding. This QKS Group report analyses the market and evaluates 14 vendors using the SPARK Matrix™ for ranking and positioning.",
  keyFacts: [
    { label: "Published", value: "15 November 2024" },
    { label: "Vendors evaluated", value: "14" },
    {
      label: "Evaluation framework",
      value: "SPARK Matrix™: Technology Excellence and Customer Impact",
    },
    { label: "Domain", value: "Application Platforms & Automation" },
    { label: "Analyst", value: "Sitaparna Roy, Analyst, QKS Group" },
    { label: "Format", value: "Market research report, PDF" },
  ],
  coverage: [
    "The report covers global market analysis, emerging technology trends, market dynamics and outlook, and competitive analysis of the marketplace development platform market.",
    "Vendor ranking and positioning use the SPARK Matrix™, which assesses vendors on Technology Excellence and Customer Impact. The report evaluates 14 vendors.",
  ],
  vendors: [
    "AppDirect",
    "Arrow Electronics",
    "Arcadier",
    "CloudBlue",
    "IZBERG",
    "Marketplacer",
    "Mirakl",
    "Oro Inc.",
    "Persistent Systems",
    "Spryker",
    "Sitecore",
    "Tradeshift",
    "Vendasta",
    "VTEX",
  ],
  toc: [
    "Executive Overview",
    "Market Dynamics and Overview",
    "Competition Landscape and Analysis (Key Competitive Factors and Technology Differentiators)",
    "SPARK Matrix™: Marketplace Development Platform",
    "Vendor Profiles",
    "Research Methodologies",
  ],
  faq: [
    {
      q: "What is a marketplace development platform?",
      a: "A marketplace development platform is software for creating, managing and scaling multi-vendor online marketplaces. Typical capabilities include multi-vendor support, catalogue and order management, payments and commissions, and partner onboarding. This report explains how these platforms are evolving and how vendors compare.",
    },
    {
      q: "Which vendors are evaluated in the SPARK Matrix™: Marketplace Development Platform, Q4 2024?",
      a: "The report evaluates 14 vendors: AppDirect, Arrow Electronics, Arcadier, CloudBlue, IZBERG, Marketplacer, Mirakl, Oro Inc., Persistent Systems, Spryker, Sitecore, Tradeshift, Vendasta and VTEX. The full vendor profiles and positioning are included in the paid report.",
    },
    {
      q: "How does the SPARK Matrix™ evaluate vendors?",
      a: "The SPARK Matrix™ ranks and positions vendors on two dimensions: Technology Excellence and Customer Impact. The report applies this framework to the 14 evaluated vendors. The competitive analysis also covers key competitive factors and technology differentiators.",
    },
    {
      q: "Who should read this report?",
      a: "The report suits readers who want a structured view of the marketplace development platform market. It covers global market analysis, emerging technology trends, market dynamics and outlook, competitive analysis, and vendor ranking and positioning. Readers comparing the 14 evaluated vendors can use the SPARK Matrix™ section.",
    },
    {
      q: "How can I get the full report?",
      a: "The full report, SPARK Matrix™: Marketplace Development Platform, Q4 2024, is a paid publication with a list price of US$5,000. It was published on 15 November 2024, with analyst Sitaparna Roy, and is a market research report in PDF format. Purchasing is not available in this demo.",
    },
  ],
};
