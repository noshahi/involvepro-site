"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";
import { contactSchema } from "@/lib/schemas";
import { serviceOptions, budgetOptions, timelineOptions } from "@/data/contact";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.fieldErrors) {
          setErrors(data.fieldErrors);
          setStatus("idle");
          return;
        }
        throw new Error(data?.error ?? "Request failed");
      }

      setStatus("success");
    } catch {
      setErrorMessage(
        "Something went wrong while sending your message. Please try again or schedule a meeting directly.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-brand-green/25 bg-brand-green-soft p-7">
        <CheckCircle2 className="h-8 w-8 text-brand-green-deep" />
        <p className="text-[15px] leading-relaxed text-canvas-dark">
          Thank you. Your message has been received. Our team will review the details and follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="name" label="Name" required placeholder="Your name" error={errors.name} />
        <FormField id="email" label="Email" type="email" required placeholder="you@company.com" error={errors.email} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="companyWebsite" label="Company / Website" required placeholder="Company or business name" error={errors.companyWebsite} />
        <FormField id="phone" label="Phone" type="tel" placeholder="Optional" error={errors.phone} />
      </div>

      <SelectField
        id="serviceNeeded"
        label="Service Needed"
        required
        options={serviceOptions}
        placeholder="Select a service"
        error={errors.serviceNeeded}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SelectField id="budgetRange" label="Budget Range" options={budgetOptions} placeholder="Select a range" error={errors.budgetRange} />
        <SelectField id="timeline" label="Timeline" options={timelineOptions} placeholder="Select a timeline" error={errors.timeline} />
      </div>

      <FormField
        id="currentWebsiteUrl"
        label="Current Website URL"
        placeholder="yourstore.com"
        error={errors.currentWebsiteUrl}
      />

      <TextareaField
        id="message"
        label="Message"
        required
        placeholder="Tell us about your project, current website, business goal, and any known requirements."
        error={errors.message}
      />

      {status === "error" && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-[13px] leading-relaxed text-red-600">{errorMessage}</p>
        </div>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-4">
        <SubmitButton label="Send Project Details" loading={status === "submitting"} />
        {status === "error" && (
          <ScheduleMeetingButton variant="dark" label="Schedule a Meeting Instead" showIcon={false} />
        )}
      </div>
    </form>
  );
}
