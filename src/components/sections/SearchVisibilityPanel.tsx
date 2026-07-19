import { CheckCircle2, Network, FileJson, HelpCircle, Link2 } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";

export function SearchVisibilityPanel() {
  return (
    <section aria-label="SEO and answer engine optimization" className="bg-brand-green-soft px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 max-w-[640px]">
          <SectionEyebrow>Search &amp; answer visibility</SectionEyebrow>
          <h2 className="font-sans text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-1px] text-canvas-dark">
            Built for Google, AI search, and real buyers.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-text-muted">
            Search is no longer just rankings and keywords. Your website needs clear entities,
            structured answers, strong internal links, schema-ready content, useful sections, and
            technical crawlability.
          </p>
        </div>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-5 md:grid-cols-6">
          <RevealItem className="md:col-span-3 rounded-2xl border border-border-soft bg-white p-7">
            <div className="mb-4 flex items-center gap-2 text-brand-green">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em]">Direct answer</span>
            </div>
            <p className="text-[15px] leading-relaxed text-canvas-dark">
              &ldquo;Involvepro is a Shopify Select Partner and WordPress development agency
              building custom-coded ecommerce websites, SEO systems, and AI automations for
              USA-focused businesses.&rdquo;
            </p>
          </RevealItem>

          <RevealItem className="md:col-span-3 rounded-2xl border border-border-soft bg-white p-7">
            <div className="mb-4 flex items-center gap-2 text-brand-blue">
              <FileJson className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em]">Schema-ready</span>
            </div>
            <pre className="overflow-auto font-mono text-[11.5px] leading-relaxed text-text-muted">
{`{
  "@type": "Organization",
  "name": "Involvepro",
  "areaServed": "US"
}`}
            </pre>
          </RevealItem>

          <RevealItem className="md:col-span-2 rounded-2xl border border-border-soft bg-white p-7">
            <div className="mb-4 flex items-center gap-2 text-brand-green">
              <Network className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em]">Entity map</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Shopify", "WordPress", "SEO", "AEO", "SaaS", "AI Automation"].map((t) => (
                <span key={t} className="rounded-full bg-canvas-soft px-3 py-1 text-[11.5px] font-medium text-canvas-dark">
                  {t}
                </span>
              ))}
            </div>
          </RevealItem>

          <RevealItem className="md:col-span-2 rounded-2xl border border-border-soft bg-white p-7">
            <div className="mb-4 flex items-center gap-2 text-brand-blue">
              <HelpCircle className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em]">FAQ snippet</span>
            </div>
            <p className="text-[13.5px] font-semibold text-canvas-dark">What is AEO?</p>
            <p className="mt-1 text-[13px] leading-relaxed text-text-muted">
              Answer engine optimization — structuring content so AI search tools can extract and
              cite it directly.
            </p>
          </RevealItem>

          <RevealItem className="md:col-span-2 rounded-2xl border border-border-soft bg-white p-7">
            <div className="mb-4 flex items-center gap-2 text-brand-green">
              <Link2 className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em]">Internal links</span>
            </div>
            <ul className="flex flex-col gap-1.5 text-[13px] text-text-muted">
              <li>Services → Shopify Development</li>
              <li>Services → SEO + AEO</li>
              <li>Work → Case studies</li>
            </ul>
          </RevealItem>
        </RevealOnScroll>
      </div>
    </section>
  );
}
