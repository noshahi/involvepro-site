"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/login/actions";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/posts", label: "Blog Posts" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/submissions", label: "Contact Submissions" },
  { href: "/admin/audit-requests", label: "Audit Requests" },
  { href: "/admin/redirects", label: "Redirects" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col justify-between border-r border-white/10 bg-[var(--brand-navy)] text-white">
      <div>
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">involvepro</p>
          <p className="text-sm font-medium text-white/80">Admin</p>
        </div>

        <nav className="flex flex-col gap-0.5 p-3">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm transition ${
                  active
                    ? "bg-brand-green/15 font-medium text-brand-green"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-2 border-t border-white/10 p-3">
        <Link
          href="/"
          target="_blank"
          className="block rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
        >
          View Site ↗
        </Link>
        <div className="px-3 text-xs text-white/40">{email}</div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full rounded-md px-3 py-2 text-left text-sm text-white/70 hover:bg-white/5 hover:text-white"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
