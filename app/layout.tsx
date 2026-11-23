import type { Metadata } from "next";
import "./globals.css";
import DemoBanner from "@/components/DemoBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const title = "QKS Group | Enterprise Technology Research & Advisory";
const description =
  "QKS Group helps technology buyers and vendors make confident decisions with independent research, SPARK Matrix™ evaluations and advisory across 220+ ICT markets.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:4000"),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Font loads in the browser; the build never depends on network access. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap" />
      </head>
      <body>
        <DemoBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
