"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const MotionLink = motion.create(Link);

type MagneticButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "dark";
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
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
  onClick,
  type = "button",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  function handleMouseMove(e: React.MouseEvent) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setOffset({ x, y });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  const sharedClassName = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold no-underline transition-colors",
    variantClasses[variant],
    className,
  );
  const sharedMotionProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: offset.x, y: offset.y },
    transition: { type: "spring" as const, stiffness: 200, damping: 14, mass: 0.4 },
    className: sharedClassName,
  };

  if (!href) {
    return (
      <motion.button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        {...sharedMotionProps}
        {...rest}
      >
        {children}
      </motion.button>
    );
  }

  const isSamePageAnchorOrExternal = href.startsWith("#") || href.startsWith("http");

  if (isSamePageAnchorOrExternal) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        {...sharedMotionProps}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionLink
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      {...sharedMotionProps}
      {...rest}
    >
      {children}
    </MotionLink>
  );
}
