"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { cn } from "@/lib/cn";
import { contactFAQs } from "@/data/contact";

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-label="Contact FAQ" className="bg-canvas-soft px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[820px]">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className="mb-8 font-sans text-[clamp(22px,2.6vw,30px)] font-bold leading-[1.18] tracking-[-0.5px] text-canvas-dark">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-3">
          {contactFAQs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question} className="overflow-hidden rounded-xl border border-border-soft bg-white">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[14.5px] font-semibold text-canvas-dark">{faq.question}</span>
                  <ChevronDown
                    className={cn("h-4 w-4 shrink-0 text-text-muted transition-transform", isOpen && "rotate-180")}
                  />
                </button>
                {isOpen && (
                  <p className="px-5 pb-4 text-[13.5px] leading-relaxed text-text-muted">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
