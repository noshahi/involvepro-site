import Image from "next/image";
import { Briefcase, Share2, Link2, MapPin, ShoppingBag, Mail, Phone } from "lucide-react";
import { navLinks } from "@/lib/data/nav";

const socialLinks = [
  { label: "Shopify Partner profile", href: "https://www.shopify.com/partners/directory/partner/involvepro-agency", icon: ShoppingBag },
  { label: "Upwork profile", href: "https://www.upwork.com/agencies/1514309167629066240/", icon: Briefcase },
  { label: "LinkedIn", href: "https://pk.linkedin.com/company/involvepro", icon: Link2 },
  { label: "Facebook", href: "https://www.facebook.com/involvepro/", icon: Share2 },
  { label: "Google Business Profile", href: "https://maps.app.goo.gl/rxxja2yAooTeWfCD9", icon: MapPin },
];

export function Footer() {
  return (
    <footer className="bg-canvas-dark px-6 pb-10 pt-16">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <Image src="/brand/logo-black.svg" alt="Involvepro" width={120} height={46} className="h-6 w-auto brightness-0 invert" />
          </div>
          <p className="mb-5 max-w-[280px] text-[13.5px] leading-relaxed text-white/50">
            Shopify Select Partner and WordPress development agency building custom-coded ecommerce
            websites, SaaS products, AI automations, and SEO systems for USA-focused businesses.
          </p>
          <div className="flex gap-2.5">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-[#8FE070] transition-colors hover:bg-white/10"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Navigate
          </p>
          <ul className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-[13.5px] text-white/65 hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Contact
          </p>
          <ul className="flex flex-col gap-3 text-[13.5px] text-white/65">
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-brand-green" />
              <a href="mailto:support@involvepro.com" className="hover:text-white">support@involvepro.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-brand-green" />
              <a href="tel:+12019794218" className="hover:text-white">+1 201 979 4218</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-brand-green" />
              Jhelum, Pakistan — serving USA clients
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Book a call
          </p>
          <a
            href="https://calendly.com/involvepro/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-brand-green px-5 py-2.5 text-[13.5px] font-semibold text-white hover:bg-brand-green-deep"
          >
            Open Calendly →
          </a>
        </div>
      </div>

      <p className="mx-auto max-w-[1280px] pt-6 text-[12px] text-white/35">
        © {new Date().getFullYear()} Involvepro. All rights reserved.
      </p>
    </footer>
  );
}
