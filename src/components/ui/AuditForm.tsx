"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";
import { auditSchema } from "@/lib/schemas";
import { auditFocusOptions, auditBudgetOptions } from "@/data/audit";

type Status = "idle" | "submitting" | "success" | "error";

export function AuditForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const parsed = auditSchema.safeParse(payload);
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
      const res = await fetch("/api/audit", {
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
        "Something went wrong while sending your audit request. Please try again or schedule a meeting directly.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-brand-green/25 bg-brand-green-soft p-7">
        <CheckCircle2 className="h-8 w-8 text-brand-green-deep" />
        <p className="text-[15px] leading-relaxed text-canvas-dark">
          Thank you. Your audit request has been received. We&rsquo;ll review the details and follow up with
          practical next steps.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot field — visually hidden, left blank by real users */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="companyFax">Do not fill this in</label>
        <input id="companyFax" name="honeypot" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="name" label="Name" required placeholder="Your name" error={errors.name} />
        <FormField id="email" label="Email" type="email" required placeholder="you@company.com" error={errors.email} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="company" label="Company" placeholder="Company name" error={errors.company} />
        <FormField id="websiteUrl" label="Website URL" required placeholder="yourstore.com" error={errors.websiteUrl} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SelectField
          id="focus"
          label="What should we focus on?"
          required
          options={auditFocusOptions}
          placeholder="Select a focus"
          error={errors.focus}
        />
        <SelectField
          id="budgetRange"
          label="Budget range"
          options={auditBudgetOptions}
          placeholder="Select a range"
          error={errors.budgetRange}
        />
      </div>

      <TextareaField
        id="message"
        label="What would you like us to look at?"
        required
        placeholder="Your goals, what's not working, or what you'd like to improve."
        error={errors.message}
      />

      {status === "error" && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-[13px] leading-relaxed text-red-600">{errorMessage}</p>
        </div>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-4">
        <SubmitButton label="Get my free audit" loading={status === "submitting"} />
        {status === "error" && (
          <ScheduleMeetingButton variant="dark" label="Schedule a Meeting Instead" showIcon={false} />
        )}
      </div>
      <p className="text-[12.5px] text-text-muted">Free · No obligation · Reply within one business day</p>
    </form>
  );
}
