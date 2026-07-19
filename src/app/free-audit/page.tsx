import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuditHero } from "@/components/sections/AuditHero";
import { AuditFormSection } from "@/components/sections/AuditFormSection";
import { AuditFocusAreas } from "@/components/sections/AuditFocusAreas";
import { AuditProcess } from "@/components/sections/AuditProcess";
import { AuditFAQ } from "@/components/sections/AuditFAQ";
import { AuditCTA } from "@/components/sections/AuditCTA";
import { auditFAQs } from "@/data/audit";
import { webPageSchema, breadcrumbSchema, faqPageSchema, serviceOfferSchema, jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Free Website, Shopify & SEO Audit | involvepro",
  description:
    "Request a free audit from involvepro for your website, Shopify store, SEO visibility, CRO path, or AI automation opportunities. Get practical insights with no obligation.",
};

export default function FreeAuditPage() {
  const pageSchema = webPageSchema({
    name: "Free Website, Shopify & SEO Audit",
    description:
      "Request a free audit from involvepro for your website, Shopify store, SEO visibility, CRO path, or AI automation opportunities. Get practical insights with no obligation.",
    path: "/free-audit",
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Free Audit", path: "/free-audit" },
  ]);
  const faqSchema = faqPageSchema(auditFAQs);
  const serviceSchema = serviceOfferSchema({
    name: "Free Website, Shopify & SEO Audit",
    description:
      "A free, no-obligation review of website performance, Shopify/ecommerce structure, SEO visibility, conversion path, or AI and automation opportunities.",
    path: "/free-audit",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(pageSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(breadcrumbs)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(serviceSchema)} />
      <Header />
      <main id="main-content" className="flex-1">
        <AuditHero />
        <AuditFormSection />
        <AuditFocusAreas />
        <AuditProcess />
        <AuditFAQ />
        <AuditCTA />
      </main>
      <Footer />
    </>
  );
}
