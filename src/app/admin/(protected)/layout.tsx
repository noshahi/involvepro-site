import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminSidebar from "@/components/admin/admin-sidebar";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-canvas-soft">
      <AdminSidebar email={session.email} />
      <main className="flex-1 overflow-x-hidden p-6 lg:p-8">{children}</main>
    </div>
  );
}
