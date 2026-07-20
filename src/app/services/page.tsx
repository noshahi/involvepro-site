import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicesHubHero } from "@/components/sections/ServicesHubHero";
import { ServiceCategoryBand } from "@/components/sections/ServiceCategoryBand";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";
import { serviceGroups, getServicesByGroup, getServiceBySlug } from "@/data/services";
import { collectionPageSchema, breadcrumbSchema, jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Shopify, SaaS, AI Automation & SEO Services | involvepro",
  description:
    "Explore involvepro services for Shopify development, WordPress, SaaS products, AI automation, SEO, AEO, CRO, analytics, and website support.",
};

const howWeHelp = [
  { question: "Need a better store?", answer: "Shopify Development / Shopify Store Design", slugs: ["shopify-development", "shopify-store-design"] },
  { question: "Getting traffic but not enough sales?", answer: "Shopify Revenue Optimization / CRO", slugs: ["shopify-revenue-optimization", "cro-ab-testing-funnel-optimization"] },
  { question: "Need more organic visibility?", answer: "SEO / AEO / GEO", slugs: ["seo", "aeo-geo-ai-search-optimization"] },
  { question: "Need a custom platform?", answer: "Full Stack / SaaS / MVP", slugs: ["full-stack-development", "saas-product-development"] },
  { question: "Need to reduce manual work?", answer: "AI Automation / Workflow Automation", slugs: ["ai-automation", "workflow-automation"] },
  { question: "Need ongoing technical ownership?", answer: "Maintenance & Support", slugs: ["website-maintenance-support"] },
];

export default function ServicesPage() {
  const collectionSchema = collectionPageSchema({
    name: "Involvepro Services",
    description: "Shopify, WordPress, SaaS, SEO, AEO, and AI automation services for growth-focused brands across markets.",
    path: "/services",
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(collectionSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(breadcrumbs)} />
      <Header />
      <main id="main-content" className="flex-1">
        <ServicesHubHero />

        <nav id="group-nav" aria-label="Service groups" className="sticky top-16 z-30 scroll-mt-24 border-b border-border-soft bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1280px] gap-1 overflow-x-auto px-6 py-3">
            {serviceGroups.map((group) => (
              <a
                key={group.key}
                href={`#${group.key}`}
                className="shrink-0 rounded-full px-4 py-2 text-[13px] font-medium text-text-muted transition-colors hover:bg-canvas-soft hover:text-canvas-dark"
              >
                {group.label}
              </a>
            ))}
          </div>
        </nav>

        {serviceGroups.map((group) => (
          <ServiceCategoryBand key={group.key} group={group} services={getServicesByGroup(group.key)} />
        ))}

        <section aria-label="How we help" className="bg-white px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px]">
            <SectionEyebrow>How we help</SectionEyebrow>
            <h2 className="mb-12 max-w-[600px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
              Choose the service around the business problem.
            </h2>
            <RevealOnScroll stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {howWeHelp.map((row) => (
                <RevealItem
                  key={row.question}
                  className="flex flex-col rounded-2xl border border-border-soft bg-canvas-soft p-6"
                >
                  <h3 className="text-[15.5px] font-semibold text-canvas-dark">{row.question}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{row.answer}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {row.slugs.map((slug) => {
                      const s = getServiceBySlug(slug);
                      if (!s) return null;
                      return (
                        <a
                          key={slug}
                          href={`/services/${slug}`}
                          className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-green hover:text-brand-green-deep"
                        >
                          {s.title} <ArrowRight className="h-3 w-3" />
                        </a>
                      );
                    })}
                  </div>
                </RevealItem>
              ))}
            </RevealOnScroll>
          </div>
        </section>

        <ProcessTimeline />

        <section
          aria-label="Schedule a meeting"
          className="relative overflow-hidden px-6 py-24 text-center sm:py-28"
          style={{ background: "linear-gradient(120deg, #082848, #06120D 55%, #2F7A21)" }}
        >
          <div className="grid-overlay pointer-events-none absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-[640px]">
            <h2 className="font-sans text-[clamp(26px,3.6vw,40px)] font-bold leading-[1.14] tracking-[-1px] text-white">
              Not sure which service fits your current priority?
            </h2>
            <p className="mx-auto mt-5 max-w-[460px] text-[15.5px] leading-relaxed text-white/70">
              Schedule a meeting and we will help define the right scope, platform, timeline,
              and technical path.
            </p>
            <div className="mt-9 flex justify-center">
              <ScheduleMeetingButton variant="solid" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
