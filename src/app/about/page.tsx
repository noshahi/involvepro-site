import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Search,
  Wrench,
  Bot,
  ShieldCheck,
  MessageSquare,
  Code2,
  Layers,
  Headphones,
  Globe,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutCTA } from "@/components/sections/AboutCTA";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { webPageSchema, breadcrumbSchema, organizationSchema, aboutPageSchema, jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About involvepro | Technical Web Development Agency",
  description:
    "Meet involvepro, a technical web development agency helping ecommerce, SaaS, and service businesses build cleaner websites, stronger digital systems, and more reliable growth infrastructure.",
};

const beliefs = [
  {
    icon: Compass,
    title: "Good design should support business goals.",
    description: "Every interface decision is judged by whether it moves a real business outcome, not by trend.",
  },
  {
    icon: Search,
    title: "SEO should be planned before launch, not patched later.",
    description: "Information architecture, metadata, and technical SEO get built into the site from day one.",
  },
  {
    icon: Wrench,
    title: "Shopify and WordPress should be easy to manage after launch.",
    description: "Clients should be able to run their own store or site without needing us for every small change.",
  },
  {
    icon: Bot,
    title: "AI should reduce real manual work, not add noise.",
    description: "We build automations and chatbots around specific, repeatable tasks — not novelty features.",
  },
  {
    icon: ShieldCheck,
    title: "Technical ownership matters after the site goes live.",
    description: "Launch is a milestone, not an end point. Someone needs to own uptime, updates, and performance.",
  },
  {
    icon: MessageSquare,
    title: "Clients need clear communication and practical execution.",
    description: "Straight answers about scope, timeline, and tradeoffs beat vague reassurance.",
  },
];

const whyClients = [
  { title: "Technical depth", description: "Custom-coded builds across Shopify, WordPress, Next.js, React, and Node.js — not template assembly." },
  { title: "Shopify Partner experience", description: "Recognized Shopify Partner agency with a track record across store builds and revenue optimization." },
  { title: "SEO-aware development", description: "Development and SEO run under one roof, so technical structure and search visibility aren't afterthoughts." },
  { title: "SaaS and automation capability", description: "Experience building SaaS products, internal tools, and AI-driven workflow automation." },
  { title: "Full-stack problem solving", description: "One team can take a project from database and API design through to the interface clients see." },
  { title: "Ongoing support", description: "Technical ownership continues after launch — monitoring, updates, and continuous improvement." },
  { title: "Structured technical delivery", description: "Clear communication across time zones, with scheduling and project cadence built for real collaboration." },
];

const processSteps = [
  { num: "01", title: "Discover", description: "Map the business, audience, and technical constraints." },
  { num: "02", title: "Plan", description: "Define scope, platform, IA, and SEO priorities up front." },
  { num: "03", title: "Design", description: "Interfaces built around real conversion paths." },
  { num: "04", title: "Build", description: "Custom-coded development, structured for search from day one." },
  { num: "05", title: "Optimize", description: "Performance, conversion, and visibility tuned before and after launch." },
  { num: "06", title: "Support", description: "Monitoring, updates, and continuous improvement after you go live." },
];

const capabilityGroups = [
  {
    label: "Ecommerce",
    icon: Layers,
    items: [
      { label: "Shopify Development", slug: "shopify-development" },
      { label: "Store Design", slug: "shopify-store-design" },
      { label: "Revenue Optimization", slug: "shopify-revenue-optimization" },
    ],
  },
  {
    label: "Websites",
    icon: Globe,
    items: [
      { label: "WordPress Development", slug: "wordpress-development" },
      { label: "Next.js Development", slug: "headless-cms-nextjs-websites" },
      { label: "Enterprise Marketing Websites", slug: "enterprise-marketing-websites" },
    ],
  },
  {
    label: "Growth",
    icon: Search,
    items: [
      { label: "SEO", slug: "seo" },
      { label: "AEO / GEO", slug: "aeo-geo-ai-search-optimization" },
      { label: "CRO & Analytics", slug: "cro-ab-testing-funnel-optimization" },
    ],
  },
  {
    label: "Software",
    icon: Code2,
    items: [
      { label: "SaaS Product Development", slug: "saas-product-development" },
      { label: "MVP Development", slug: "mvp-development" },
      { label: "Full Stack Development", slug: "full-stack-development" },
    ],
  },
  {
    label: "AI & Automation",
    icon: Bot,
    items: [
      { label: "AI Automation", slug: "ai-automation" },
      { label: "Chatbots / LLM Integration", slug: "ai-chatbot-llm-integration" },
      { label: "Workflow Automation", slug: "workflow-automation" },
    ],
  },
  {
    label: "Support",
    icon: Headphones,
    items: [{ label: "Website Maintenance", slug: "website-maintenance-support" }],
  },
];

export default function AboutPage() {
  const pageSchema = webPageSchema({
    name: "About involvepro",
    description:
      "Meet involvepro, a technical web development agency helping ecommerce, SaaS, and service businesses build cleaner websites, stronger digital systems, and more reliable growth infrastructure.",
    path: "/about",
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);
  const about = aboutPageSchema({
    name: "About involvepro",
    description:
      "Meet involvepro, a technical web development agency helping ecommerce, SaaS, and service businesses build cleaner websites, stronger digital systems, and more reliable growth infrastructure.",
    path: "/about",
  });
  const organization = organizationSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(pageSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(breadcrumbs)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(about)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(organization)} />
      <Header />
      <main id="main-content" className="flex-1">
        <AboutHero />

        {/* Our Story */}
        <section aria-label="Our story" className="bg-white px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-[760px]">
            <SectionEyebrow>Our story</SectionEyebrow>
            <h2 className="max-w-[600px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
              Built around practical technical execution.
            </h2>
            <div className="mt-6 space-y-5 text-[15.5px] leading-[1.7] text-text-muted">
              <p>
                involvepro was built around one idea: businesses need more than a good-looking
                website. Most of the sites and stores we take over start the same way — a messy
                Shopify or WordPress setup, disconnected tools, and SEO structure that was never
                planned, only patched.
              </p>
              <p>
                We help businesses move from that state into cleaner digital systems — platforms
                that are fast, structured for search, easy to manage after launch, and built on
                a technical foundation that holds up as the business grows.
              </p>
              <p>
                Instead of treating development, SEO, automation, and support as separate,
                disconnected services handled by different vendors, we run them under one team.
                That&apos;s what lets us plan for search visibility before a line of code is written,
                and keep owning the technical side after the site goes live.
              </p>
            </div>
          </div>
        </section>

        {/* What We Believe */}
        <section aria-label="What we believe" className="bg-canvas-soft px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px]">
            <SectionEyebrow>What we believe</SectionEyebrow>
            <h2 className="mb-12 max-w-[600px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
              A few things we don&apos;t compromise on.
            </h2>
            <RevealOnScroll stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {beliefs.map(({ icon: Icon, title, description }) => (
                <RevealItem
                  key={title}
                  className="flex flex-col rounded-2xl border border-border-soft bg-white p-6"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green-soft text-brand-green-deep">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-[15.5px] font-semibold leading-snug text-canvas-dark">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{description}</p>
                </RevealItem>
              ))}
            </RevealOnScroll>
          </div>
        </section>

        {/* Why Clients Work With Us */}
        <section aria-label="Why clients work with us" className="bg-white px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px]">
            <SectionEyebrow>Why clients work with us</SectionEyebrow>
            <h2 className="mb-12 max-w-[600px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
              What that looks like in practice.
            </h2>
            <RevealOnScroll stagger className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
              {whyClients.map((row) => (
                <RevealItem key={row.title} className="flex gap-4 border-b border-border-soft pb-8">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  <div>
                    <h3 className="text-[15px] font-semibold text-canvas-dark">{row.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-muted">{row.description}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealOnScroll>
            <p className="mt-10 max-w-[720px] text-[13.5px] leading-relaxed text-text-muted">
              Experience supporting growth-focused brands, including businesses with Shark
              Tank-related visibility and deal momentum.
            </p>
          </div>
        </section>

        {/* How We Work */}
        <section aria-label="How we work" className="bg-canvas-dark px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px]">
            <SectionEyebrow tone="light">How we work</SectionEyebrow>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-[560px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-white">
                A structured process from discovery to ongoing support.
              </h2>
              <Link
                href="/process"
                className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#8FE070] hover:text-white"
              >
                See the full process <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <RevealOnScroll stagger className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
              {processSteps.map((step) => (
                <RevealItem
                  key={step.num}
                  className="rounded-2xl border border-white/10 bg-[#0c1712] p-4"
                >
                  <p className="font-mono text-[11px] font-medium text-brand-green">{step.num}</p>
                  <p className="mt-2 text-[13.5px] font-semibold text-white">{step.title}</p>
                  <p className="mt-1.5 text-[11.5px] leading-snug text-white/45">{step.description}</p>
                </RevealItem>
              ))}
            </RevealOnScroll>
          </div>
        </section>

        {/* Capabilities */}
        <section aria-label="Capabilities" className="bg-white px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px]">
            <SectionEyebrow>Capabilities</SectionEyebrow>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-[560px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
                Everything runs under one technical team.
              </h2>
              <Link
                href="/services"
                className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-brand-green hover:text-brand-green-deep"
              >
                View all services <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {capabilityGroups.map(({ label, icon: Icon, items }) => (
                <div key={label} className="rounded-2xl border border-border-soft bg-canvas-soft p-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-green-deep">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-[14px] font-semibold uppercase tracking-[0.08em] text-canvas-dark">
                    {label}
                  </h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={`/services/${item.slug}`}
                          className="text-[13.5px] text-text-muted hover:text-brand-green"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Human / media readiness placeholder */}
        <section aria-label="The team behind the work" className="bg-canvas-soft px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px]">
            <SectionEyebrow>The team behind the work</SectionEyebrow>
            <h2 className="max-w-[600px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
              Based in Jhelum, Pakistan — international client experience.
            </h2>
            <p className="mt-5 max-w-[620px] text-[14.5px] leading-relaxed text-text-muted">
              A development and SEO team with structured technical delivery and clients across markets, with real project photography
              and team profiles being added here as they become available.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {["Discovery calls", "Build & QA", "Ongoing support"].map((label) => (
                <div
                  key={label}
                  className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border-soft bg-white/60 text-center"
                >
                  <span className="h-10 w-10 rounded-full bg-brand-green-soft" />
                  <p className="text-[12.5px] font-medium text-text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
