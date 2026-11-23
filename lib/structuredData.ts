import type { Report } from "@/lib/reports/marketplace-development-platform";

const PUBLISHER_NAME = "QKS Group";
const PUBLISHER_URL = "https://qksgroup.com";
const RESEARCH_LIBRARY_URL = `${PUBLISHER_URL}/market-research/`;

export function reportJsonLd(report: Report, pageUrl: string) {
  const Report = {
    "@type": "Report",
    "@id": `${pageUrl}#report`,
    url: pageUrl,
    name: report.title,
    headline: report.title,
    description: report.shortAnswer,
    datePublished: report.published,
    author: {
      "@type": "Person",
      name: report.analyst.name,
    },
    publisher: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
      url: PUBLISHER_URL,
    },
    about: {
      "@type": "Thing",
      name: report.shortTitle,
    },
    inLanguage: "en",
    isAccessibleForFree: false,
    offers: {
      "@type": "Offer",
      price: String(report.priceUSD),
      priceCurrency: "USD",
    },
  };

  const FAQPage = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: report.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: PUBLISHER_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Research Library",
        item: RESEARCH_LIBRARY_URL,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: report.shortTitle,
        item: pageUrl,
      },
    ],
  };

  const Organization = {
    "@type": "Organization",
    "@id": `${PUBLISHER_URL}/#organization`,
    name: PUBLISHER_NAME,
    url: PUBLISHER_URL,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [Report, FAQPage, BreadcrumbList, Organization],
  };
}
