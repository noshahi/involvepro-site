import type { Metadata } from "next";
import { ShoppingCart, Globe2, LineChart, Cpu, Bot } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WorkHero } from "@/components/sections/WorkHero";
import { FeaturedWorkPanel } from "@/components/sections/FeaturedWorkPanel";
import { WorkBentoGrid } from "@/components/sections/WorkBentoGrid";
import { WorkCTA } from "@/components/sections/WorkCTA";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { collectionPageSchema, breadcrumbSchema, jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Web Design, Shopify, SaaS & SEO Projects | involvepro",
  description:
    "View selected involvepro work across Shopify, WordPress, ecommerce, SaaS, SEO, custom tools, B2B, local business, and high-visibility brands.",
};

const capabilityBands = [
  {
    key: "ecommerce",
    label: "Ecommerce",
    icon: ShoppingCart,
    description: "Shopify builds, storefront redesigns, product pages, collection systems, conversion paths.",
    slugs: ["shopify-development", "shopify-store-design", "shopify-revenue-optimization"],
  },
  {
    key: "websites",
    label: "Websites",
    icon: Globe2,
    description: "WordPress, headless sites, enterprise marketing websites, landing pages, content systems.",
    slugs: ["wordpress-development", "enterprise-marketing-websites", "headless-cms-nextjs-websites"],
  },
  {
    key: "growth",
    label: "Growth",
    icon: LineChart,
    description: "SEO, AEO/GEO, tracking, analytics, CRO, technical search improvements.",
    slugs: ["seo", "aeo-geo-ai-search-optimization", "cro-ab-testing-funnel-optimization"],
  },
  {
    key: "software",
    label: "Software",
    icon: Cpu,
    description: "SaaS MVPs, dashboards, full-stack apps, internal tools, APIs.",
    slugs: ["saas-product-development", "full-stack-development", "custom-tool-development"],
  },
  {
    key: "ai-automation",
    label: "AI & Automation",
    icon: Bot,
    description: "AI assistants, workflow automation, reporting automation, document/data processing.",
    slugs: ["ai-automation", "ai-chatbot-llm-integration", "workflow-automation"],
  },
];

export default function WorkPage() {
  const collectionSchema = collectionPageSchema({
    name: "Involvepro Work",
    description:
      "Selected involvepro work across Shopify, WordPress, ecommerce, SaaS, SEO, custom tools, B2B, local business, and high-visibility brands.",
    path: "/work",
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(collectionSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(breadcrumbs)} />
      <Header />
      <main id="main-content" className="flex-1">
        <WorkHero />
        <FeaturedWorkPanel />
        <WorkBentoGrid />

        <section aria-label="Capabilities" className="relative overflow-hidden bg-canvas-dark px-6 py-24 sm:py-28">
          <div className="grid-overlay-blue pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative mx-auto max-w-[1280px]">
            <SectionEyebrow tone="light">Capabilities</SectionEyebrow>
            <h2 className="mb-14 max-w-[600px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-white">
              Built across the systems businesses depend on.
            </h2>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {capabilityBands.map((band) => {
                const Icon = band.icon;
                return (
                  <div
                    key={band.key}
                    className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green to-brand-green-deep">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-[16.5px] font-semibold text-white">{band.label}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-white/50">{band.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {band.slugs.map((slug) => (
                        <a
                          key={slug}
                          href={`/services/${slug}`}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-[11.5px] font-medium text-white/70 transition-colors hover:border-brand-green/40 hover:text-white"
                        >
                          {slug
                            .split("-")
                            .join(" ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <WorkCTA />
      </main>
      <Footer />
    </>
  );
}
