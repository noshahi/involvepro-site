import Image from "next/image";
import { Quote } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { testimonials } from "@/lib/data/testimonials";

export function TestimonialStrip() {
  return (
    <section aria-label="Client testimonials" className="bg-white px-6 py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
        <div>
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/photos/team-strategy.jpg"
              alt="Involvepro team working through a strategy session"
              width={520}
              height={640}
              className="h-[340px] w-full object-cover lg:h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas-dark/50 via-transparent to-transparent" />
          </div>
          <SectionEyebrow className="mt-6">People behind the systems</SectionEyebrow>
          <p className="text-[14px] leading-relaxed text-text-muted">
            A technical team you can actually talk to — discovery calls, build updates, and
            support from people who read your code, not a ticket queue.
          </p>
        </div>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <RevealItem
              key={t.role}
              className={i === 0 ? "sm:col-span-2 rounded-2xl border border-border-soft bg-canvas-soft p-8" : "rounded-2xl border border-border-soft bg-canvas-soft p-8"}
            >
              <Quote className="h-5 w-5 text-brand-green" />
              <blockquote className="mt-4 text-[15px] leading-relaxed text-canvas-dark">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[13px] font-medium text-text-muted">{t.role}</figcaption>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
