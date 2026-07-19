import { Mail, Phone, MapPin, CalendarCheck2 } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/GlassCard";
import { RevealOnScroll, RevealItem } from "@/components/ui/RevealOnScroll";
import { contactTrustSteps, contactDetails, contactProfileLinks } from "@/data/contact";

export function ContactTrustPanel() {
  return (
    <section aria-label="What happens next" className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <SectionEyebrow>What happens next</SectionEyebrow>
          <h2 className="mb-8 max-w-[520px] font-sans text-[clamp(22px,2.6vw,30px)] font-bold leading-[1.18] tracking-[-0.5px] text-canvas-dark">
            What happens after you contact us?
          </h2>
          <RevealOnScroll stagger className="flex flex-col gap-4">
            {contactTrustSteps.map((step, i) => (
              <RevealItem key={step} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green-soft font-mono text-[12px] font-semibold text-brand-green-deep">
                  {i + 1}
                </span>
                <p className="pt-1 text-[14.5px] leading-relaxed text-canvas-dark">{step}</p>
              </RevealItem>
            ))}
          </RevealOnScroll>
          <p className="mt-6 text-[12.5px] font-medium text-text-muted">
            Free 30-minute call · No obligation
          </p>
        </div>

        <div className="rounded-2xl border border-border-soft bg-canvas-soft p-7">
          <SectionEyebrow>Direct contact</SectionEyebrow>
          <h3 className="mb-6 text-[18px] font-bold text-canvas-dark">Contact involvepro</h3>
          <ul className="flex flex-col gap-4 text-[14px] text-text-main">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
              <a href={`mailto:${contactDetails.email}`} className="hover:text-brand-green-deep">
                {contactDetails.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
              <a href={`tel:${contactDetails.phoneHref}`} className="hover:text-brand-green-deep">
                {contactDetails.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
              <span>{contactDetails.location}</span>
            </li>
            <li className="flex items-start gap-3">
              <CalendarCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
              <span>Booking: Schedule a 30-minute consultation</span>
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-border-soft pt-6">
            {contactProfileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border-soft bg-white px-3.5 py-1.5 text-[12px] font-medium text-canvas-dark transition-colors hover:border-brand-green/40 hover:text-brand-green"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
