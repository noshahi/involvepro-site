"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CalendlyModal } from "@/components/ui/CalendlyModal";

type ScheduleMeetingButtonProps = {
  variant?: "solid" | "outline" | "dark";
  className?: string;
  label?: string;
  showIcon?: boolean;
};

export function ScheduleMeetingButton({
  variant = "solid",
  className,
  label = "Schedule a Meeting",
  showIcon = true,
}: ScheduleMeetingButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MagneticButton variant={variant} className={className} onClick={() => setOpen(true)}>
        {label} {showIcon && <ArrowRight className="h-4 w-4" />}
      </MagneticButton>
      <CalendlyModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
