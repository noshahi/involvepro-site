"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "dark";
  className?: string;
  target?: string;
  rel?: string;
};

const variantClasses: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  solid: "bg-brand-green text-white hover:bg-brand-green-deep",
  outline: "bg-transparent text-white border border-white/30 hover:bg-white/10",
  dark: "bg-canvas-dark text-white hover:bg-black",
};

export function MagneticButton({
  href,
  children,
  variant = "solid",
  className,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setOffset({ x, y });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 14, mass: 0.4 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold no-underline transition-colors",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </motion.a>
  );
}
