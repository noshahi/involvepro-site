"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import type { Service } from "@/data/services";
import { cn } from "@/lib/cn";

export function ServiceFAQ({ service }: { service: Service }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-label="Frequently asked questions" className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[860px]">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className="mb-10 max-w-[520px] font-sans text-[clamp(24px,2.8vw,34px)] font-bold leading-[1.16] tracking-[-0.5px] text-canvas-dark">
          Common questions about {service.title}.
        </h2>

        <div className="flex flex-col divide-y divide-border-soft border-y border-border-soft">
          {service.faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-[15px] font-semibold text-canvas-dark">{faq.question}</span>
                  <Plus className={cn("h-4 w-4 shrink-0 text-brand-green transition-transform", open && "rotate-45")} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[14px] leading-relaxed text-text-muted">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
