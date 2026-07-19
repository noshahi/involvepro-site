import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactOptions } from "@/components/sections/ContactOptions";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { ContactTrustPanel } from "@/components/sections/ContactTrustPanel";
import { ContactFAQ } from "@/components/sections/ContactFAQ";
import { WorkCTA } from "@/components/sections/WorkCTA";
import { contactFAQs } from "@/data/contact";
import { contactPageSchema, breadcrumbSchema, faqPageSchema, jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact involvepro | Discuss Your Website or SaaS Project",
  description:
    "Contact involvepro to discuss Shopify development, WordPress, SEO, SaaS products, AI automation, full-stack tools, or website maintenance support.",
};

export default function ContactPage() {
  const pageSchema = contactPageSchema({
    name: "Contact involvepro",
    description:
      "Contact involvepro to discuss Shopify development, WordPress, SEO, SaaS products, AI automation, full-stack tools, or website maintenance support.",
    path: "/contact",
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);
  const faqSchema = faqPageSchema(contactFAQs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(pageSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(breadcrumbs)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(faqSchema)} />
      <Header />
      <main id="main-content" className="flex-1">
        <ContactHero />
        <ContactOptions />
        <ContactFormSection />
        <ContactTrustPanel />
        <ContactFAQ />
        <WorkCTA
          headline="Ready to move from idea to execution?"
          body="Send the project details or schedule a meeting and we will help define the right scope, platform, timeline, and technical approach."
        />
      </main>
      <Footer />
    </>
  );
}
