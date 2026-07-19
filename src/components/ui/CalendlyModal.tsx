"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/involvepro/30min";
const CALENDLY_EMBED_URL = `${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1`;

type CalendlyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="presentation"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas-dark/70 px-4 py-6 backdrop-blur-sm sm:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Schedule a meeting"
            className="relative flex max-h-[92vh] w-full max-w-[720px] flex-col overflow-hidden rounded-2xl border border-border-soft bg-white shadow-2xl"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-border-soft px-5 py-4 sm:px-6">
              <div>
                <p className="text-[14.5px] font-semibold text-canvas-dark">Schedule a Meeting</p>
                <p className="text-[12px] text-text-muted">Free 30-minute call · No obligation</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close scheduling modal"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-canvas-soft hover:text-canvas-dark"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-canvas-soft">
              <iframe
                src={CALENDLY_EMBED_URL}
                title="Schedule a meeting with involvepro via Calendly"
                className="h-[640px] w-full sm:h-[700px]"
                loading="lazy"
              />
            </div>

            <div className="border-t border-border-soft px-5 py-3.5 text-center sm:px-6">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-green hover:text-brand-green-deep"
              >
                Open Calendly in a new tab <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
