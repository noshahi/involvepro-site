import { isDatabaseConfigured, prisma } from "@/lib/db";
import { DbSetupNotice } from "@/components/admin/ui";
import SettingsForm from "./settings-form";

export default async function SettingsPage() {
  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <Header />
        <DbSetupNotice feature="site settings" />
      </div>
    );
  }

  const records = await prisma.siteSetting.findMany();
  const values = Object.fromEntries(records.map((r) => [r.key, r.value]));

  return (
    <div className="max-w-3xl space-y-6">
      <Header />
      <SettingsForm values={values} />
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-[var(--brand-navy)]">Settings</h1>
      <p className="text-sm text-text-muted">Global site details used across the public site.</p>
    </div>
  );
}
