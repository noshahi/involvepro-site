"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { BlogPostFAQ } from "@/data/posts";

export function ArticleFAQ({ faqs }: { faqs: BlogPostFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <div id="faq" className="scroll-mt-24">
      <h2 className="font-sans text-[clamp(20px,2.2vw,26px)] font-bold leading-[1.24] tracking-[-0.4px] text-canvas-dark">
        Frequently asked questions
      </h2>
      <div className="mt-5 flex flex-col gap-3">
        {faqs.map((faq, i) => {
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
  );
}
