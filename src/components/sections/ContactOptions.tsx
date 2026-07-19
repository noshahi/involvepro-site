"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { CalendlyModal } from "@/components/ui/CalendlyModal";
import { contactOptions } from "@/data/contact";

export function ContactOptions() {
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  return (
    <section aria-label="Contact options" className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionEyebrow>Get started</SectionEyebrow>
        <h2 className="mb-12 max-w-[560px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
          Choose the easiest way to start.
        </h2>

        <RevealOnScroll stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactOptions.map((option) => (
            <RevealItem key={option.title} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border-soft bg-canvas-soft p-6 transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(6,18,13,0.08)]">
                <div>
                  <h3 className="text-[15.5px] font-semibold text-canvas-dark">{option.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-text-muted">{option.description}</p>
                </div>

                {option.href ? (
                  <Link
                    href={option.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-green"
                  >
                    {option.ctaLabel} <ArrowRight className="h-3 w-3" />
                  </Link>
                ) : option.action === "meeting" ? (
                  <button
                    type="button"
                    onClick={() => setCalendlyOpen(true)}
                    className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-green"
                  >
                    {option.ctaLabel} <ArrowRight className="h-3 w-3" />
                  </button>
                ) : (
                  <a
                    href="#contact-form"
                    className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-green"
                  >
                    {option.ctaLabel} <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>

      <CalendlyModal isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </section>
  );
}
