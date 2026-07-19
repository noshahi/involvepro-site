import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://involvepro.com"),
  title: "Involvepro | Shopify, WordPress & SEO Development Agency for USA Ecommerce Brands",
  description:
    "Involvepro is a technical Shopify Select Partner and WordPress development agency building high-converting, custom-coded websites, ecommerce stores, SaaS products, and AI automations for USA-based brands.",
  openGraph: {
    title: "Involvepro — Shopify, WordPress & SEO Development Agency",
    description:
      "Custom-coded Shopify and WordPress websites, ecommerce SEO, SaaS product development, AI automation, and technical support for USA-focused businesses.",
    type: "website",
    url: "https://involvepro.com/",
  },
  icons: {
    icon: "/brand/Favicon-New-Green.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Involvepro",
  url: "https://involvepro.com/",
  logo: "https://involvepro.com/brand/logo-green.svg",
  description:
    "Shopify Select Partner and WordPress development agency offering custom-coded ecommerce websites, SaaS products, AI automation, technical SEO, UI/UX design and ongoing support for USA-based businesses.",
  email: "support@involvepro.com",
  telephone: "+1-201-979-4218",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jhelum",
    addressCountry: "PK",
  },
  areaServed: "US",
  sameAs: [
    "https://www.shopify.com/partners/directory/partner/involvepro-agency",
    "https://www.upwork.com/agencies/1514309167629066240/",
    "https://pk.linkedin.com/company/involvepro",
    "https://www.facebook.com/involvepro/",
    "https://maps.app.goo.gl/rxxja2yAooTeWfCD9",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Involvepro",
  url: "https://involvepro.com/",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
