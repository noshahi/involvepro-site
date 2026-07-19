"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, navServiceGroups } from "@/lib/data/nav";
import { cn } from "@/lib/cn";

const CALENDLY_URL = "https://calendly.com/involvepro/30min";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 32);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "bg-white/95 backdrop-blur-md border-b border-border-soft shadow-[0_2px_20px_rgba(6,18,13,0.06)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-3.5"
      >
        <a href="#home" aria-label="Involvepro home" className="flex shrink-0 items-center gap-3">
          <Image
            src="/brand/logo-black.svg"
            alt="Involvepro"
            width={132}
            height={51}
            className={cn("h-7 w-auto transition-[filter] duration-300", !solid && "brightness-0 invert")}
            priority
          />
          <span
            className={cn(
              "hidden h-5 w-px sm:inline-block",
              solid ? "bg-border-soft" : "bg-white/25",
            )}
          />
          <Image
            src="/brand/shopify-select-badge.svg"
            alt="Shopify Select Partner"
            width={92}
            height={24}
            className="hidden h-5 w-auto rounded-md bg-white px-1.5 py-1 sm:block"
          />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasMegaMenu && setServicesOpen(true)}
              onMouseLeave={() => item.hasMegaMenu && setServicesOpen(false)}
            >
              <a
                href={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors",
                  solid
                    ? "text-text-main hover:text-brand-green"
                    : "text-white/85 hover:text-white",
                )}
              >
                {item.label}
                {item.hasMegaMenu && (
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")}
                  />
                )}
              </a>

              <AnimatePresence>
                {item.hasMegaMenu && servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-1/2 top-full mt-3 w-[620px] -translate-x-1/2 rounded-2xl border border-border-soft bg-white p-6 shadow-[0_24px_60px_rgba(6,18,13,0.16)]"
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {navServiceGroups.map((group) => (
                        <div key={group.heading}>
                          <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">
                            {group.heading}
                          </p>
                          <ul className="flex flex-col gap-3">
                            {group.items.map((svc) => (
                              <li key={svc.title}>
                                <a href="#services" className="group block">
                                  <span className="block text-[13.5px] font-semibold text-canvas-dark group-hover:text-brand-green">
                                    {svc.title}
                                  </span>
                                  <span className="mt-0.5 block text-[12px] leading-snug text-text-muted">
                                    {svc.description}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-brand-green px-5 py-2.5 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-brand-green-deep sm:inline-flex"
          >
            Schedule a Meeting
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border lg:hidden",
              solid ? "border-border-soft text-canvas-dark" : "border-white/25 text-white",
            )}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-border-soft bg-white lg:hidden"
          >
            <motion.div
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-1 px-6 py-6"
            >
              {navLinks.map((item) => (
                <motion.a
                  key={item.label}
                  variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15px] font-medium text-canvas-dark hover:bg-canvas-soft"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 rounded-full bg-brand-green px-5 py-3.5 text-center text-[15px] font-semibold text-white"
              >
                Schedule a Meeting
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
