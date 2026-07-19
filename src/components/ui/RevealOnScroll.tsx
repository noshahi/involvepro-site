"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
  stagger?: boolean;
};

export function RevealOnScroll({ children, className, delay = 0, stagger = false }: RevealOnScrollProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={stagger ? staggerContainer : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={stagger ? undefined : { delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={cn(className)} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
