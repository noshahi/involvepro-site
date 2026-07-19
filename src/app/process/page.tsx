import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProcessHero } from "@/components/sections/ProcessHero";
import { ProcessOverviewRail } from "@/components/sections/ProcessOverviewRail";
import { RequirementGathering } from "@/components/sections/RequirementGathering";
import { ProjectTimeline } from "@/components/sections/ProjectTimeline";
import { ProcessEngagementTypes } from "@/components/sections/ProcessEngagementTypes";
import { CommunicationModel } from "@/components/sections/CommunicationModel";
import { ProcessQualityAssurance } from "@/components/sections/ProcessQualityAssurance";
import { ProcessCTA } from "@/components/sections/ProcessCTA";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { processSteps } from "@/data/process";
import { webPageSchema, breadcrumbSchema, howToSchema, jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Website, SaaS & Automation Development Process | involvepro",
  description:
    "See involvepro's structured process for discovery, strategy, UI/UX, development, SEO, AEO, tracking, QA, launch, and ongoing optimization.",
};

const relatedServiceLinks = [
  { label: "Shopify Development", slug: "shopify-development" },
  { label: "SEO", slug: "seo" },
  { label: "AEO / GEO / AI Search Optimization", slug: "aeo-geo-ai-search-optimization" },
  { label: "SaaS Product Development", slug: "saas-product-development" },
  { label: "AI Automation", slug: "ai-automation" },
  { label: "Website Maintenance & Support", slug: "website-maintenance-support" },
];

export default function ProcessPage() {
  const pageSchema = webPageSchema({
    name: "involvepro Process",
    description:
      "involvepro's structured process for discovery, strategy, UI/UX, development, SEO, AEO, tracking, QA, launch, and ongoing optimization.",
    path: "/process",
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Process", path: "/process" },
  ]);
  const howTo = howToSchema({
    name: "The involvepro project process",
    description: "How involvepro takes a project from requirement gathering to launch and ongoing support.",
    steps: processSteps.map((step) => ({ title: step.title, description: step.description })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(pageSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(breadcrumbs)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(howTo)} />
      <Header />
      <main id="main-content" className="flex-1">
        <ProcessHero />
        <ProcessOverviewRail />
        <RequirementGathering />
        <ProjectTimeline />
        <ProcessEngagementTypes />
        <CommunicationModel />
        <ProcessQualityAssurance />

        <section aria-label="Related services and work" className="bg-canvas-soft px-6 py-16">
          <div className="mx-auto max-w-[1280px]">
            <SectionEyebrow>Where this applies</SectionEyebrow>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <p className="max-w-[520px] text-[14px] leading-relaxed text-text-muted">
                This process runs behind every engagement — see it applied across our{" "}
                <Link href="/services" className="font-semibold text-brand-green hover:text-brand-green-deep">
                  services
                </Link>{" "}
                and in our{" "}
                <Link href="/work" className="font-semibold text-brand-green hover:text-brand-green-deep">
                  project work
                </Link>
                , or{" "}
                <Link href="/contact" className="font-semibold text-brand-green hover:text-brand-green-deep">
                  get in touch
                </Link>{" "}
                to talk through your own.
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedServiceLinks.map((link) => (
                  <a
                    key={link.slug}
                    href={`/services/${link.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border border-border-soft bg-white px-3.5 py-1.5 text-[12px] font-medium text-canvas-dark transition-colors hover:border-brand-green/40 hover:text-brand-green"
                  >
                    {link.label} <ArrowRight className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ProcessCTA />
      </main>
      <Footer />
    </>
  );
}
