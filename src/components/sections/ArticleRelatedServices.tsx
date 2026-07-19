import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { getServiceBySlug } from "@/data/services";

export function ArticleRelatedServices({ slugs }: { slugs: string[] }) {
  const services = slugs.map((slug) => getServiceBySlug(slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (services.length === 0) return null;

  return (
    <section aria-label="Related services" className="bg-canvas-soft px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[820px]">
        <SectionEyebrow>Related services</SectionEyebrow>
        <h2 className="mb-8 font-sans text-[clamp(20px,2.2vw,26px)] font-bold leading-[1.2] tracking-[-0.4px] text-canvas-dark">
          Apply this to your website.
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex items-center justify-between rounded-xl border border-border-soft bg-white px-5 py-4 transition-colors hover:border-brand-green/40"
            >
              <span className="text-[14px] font-semibold text-canvas-dark">{service.title}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand-green transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
