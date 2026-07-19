import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { isAdminAuthConfigured } from "@/lib/auth";
import LoginForm from "./login-form";

export const metadata = {
  title: "Admin Login | involvepro",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const session = await getSession();
  if (session) {
    redirect("/admin");
  }

  const { from } = await searchParams;
  const configured = isAdminAuthConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--canvas-navy)] px-4">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[var(--brand-navy)] p-8 shadow-xl">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">involvepro</p>
          <h1 className="mt-1 text-xl font-semibold text-white">Admin Login</h1>
        </div>

        {!configured ? (
          <div className="rounded-md border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
            Admin login is not configured yet. Set <code>ADMIN_EMAIL</code>, <code>ADMIN_PASSWORD_HASH</code>,
            and <code>NEXTAUTH_SECRET</code> in your environment to enable it.
          </div>
        ) : (
          <LoginForm from={from} />
        )}
      </div>
    </div>
  );
}
