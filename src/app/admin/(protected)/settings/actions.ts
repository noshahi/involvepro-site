"use server";

import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { getSession } from "@/lib/session";
import { SITE_SETTING_KEYS } from "@/lib/site-settings";

export type SettingsFormState = { error?: string; success?: boolean };

export async function saveSettingsAction(
  _prev: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  const session = await getSession();
  if (!session) return { error: "Not authenticated." };
  if (!isDatabaseConfigured()) return { error: "Database is not configured." };

  await Promise.all(
    SITE_SETTING_KEYS.map((key) => {
      const value = String(formData.get(key) ?? "").trim();
      return prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }),
  );

  revalidatePath("/admin/settings");
  return { success: true };
}
