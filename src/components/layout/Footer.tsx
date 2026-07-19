import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { navLinks } from "@/lib/data/nav";
import { primaryServices, secondaryServices } from "@/data/services";
import { ScheduleMeetingButton } from "@/components/ui/ScheduleMeetingButton";

const socialLinks = [
  { label: "Shopify Partner profile", href: "https://www.shopify.com/partners/directory/partner/involvepro-agency", mark: "Sp" },
  { label: "Upwork profile", href: "https://www.upwork.com/agencies/1514309167629066240/", mark: "Uw" },
  { label: "LinkedIn", href: "https://pk.linkedin.com/company/involvepro", mark: "In" },
  { label: "Facebook", href: "https://www.facebook.com/involvepro/", mark: "Fb" },
  { label: "Google Business Profile", href: "https://maps.app.goo.gl/rxxja2yAooTeWfCD9", mark: "Gb" },
];

const footerServiceLinks = [...primaryServices, ...secondaryServices.slice(0, 2)].map((s) => ({
  label: s.title,
  href: `/services/${s.slug}`,
}));

const resourceLinks = [
  { label: "Featured Work", href: "/work" },
  { label: "Our Process", href: "/process" },
  { label: "Insights", href: "/insights" },
  { label: "All Services", href: "/services" },
  { label: "Get in Touch", href: "/#contact" },
];

export function Footer() {
  return (
    <footer className="bg-canvas-dark px-6 pb-8 pt-16">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-x-8 gap-y-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <Link href="/" aria-label="Involvepro home">
              <Image src="/brand/logo-black.svg" alt="Involvepro" width={120} height={46} className="h-6 w-auto brightness-0 invert" />
            </Link>
          </div>
          <p className="mb-6 max-w-[280px] text-[13.5px] leading-relaxed text-white/50">
            Shopify Select Partner and WordPress development agency building custom-coded ecommerce
            websites, SaaS products, AI automations, and SEO systems for USA-focused businesses.
          </p>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map(({ label, href, mark }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 font-mono text-[11px] font-semibold text-[#8FE070] transition-colors hover:bg-white/10"
              >
                {mark}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Services
          </p>
          <ul className="flex flex-col gap-3">
            {footerServiceLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-[13.5px] leading-snug text-white/65 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Resources
          </p>
          <ul className="flex flex-col gap-3">
            {resourceLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-[13.5px] text-white/65 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Contact
          </p>
          <ul className="flex flex-col gap-3 text-[13.5px] text-white/65">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
              <a href="mailto:support@involvepro.com" className="hover:text-white">support@involvepro.com</a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
              <a href="tel:+12019794218" className="hover:text-white">+1 201 979 4218</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
              <span>Jhelum, Pakistan — serving USA clients</span>
            </li>
          </ul>
          <ScheduleMeetingButton variant="solid" className="mt-5 px-5 py-2.5 text-[13.5px]" />
        </div>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-col-reverse items-center gap-4 pt-6 sm:flex-row sm:justify-between">
        <p className="text-[12px] text-white/35">
          © {new Date().getFullYear()} Involvepro. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} className="text-[12px] text-white/35 hover:text-white/60">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
