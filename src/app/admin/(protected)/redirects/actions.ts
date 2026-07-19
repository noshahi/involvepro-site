"use server";

import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirectSchema } from "@/lib/admin-schemas";

export type RedirectFormState = { error?: string };

export async function createRedirectAction(
  _prev: RedirectFormState,
  formData: FormData,
): Promise<RedirectFormState> {
  const session = await getSession();
  if (!session) return { error: "Not authenticated." };
  if (!isDatabaseConfigured()) return { error: "Database is not configured." };

  const parsed = redirectSchema.safeParse({
    sourcePath: formData.get("sourcePath"),
    destinationUrl: formData.get("destinationUrl"),
    type: formData.get("type"),
    active: formData.get("active") === "on",
    notes: formData.get("notes"),
  });

  if (!parsed.success) return { error: "Please check the highlighted fields." };

  const existing = await prisma.redirect.findUnique({ where: { sourcePath: parsed.data.sourcePath } });
  if (existing) return { error: "A redirect for that source path already exists." };

  await prisma.redirect.create({
    data: {
      sourcePath: parsed.data.sourcePath,
      destinationUrl: parsed.data.destinationUrl,
      type: parsed.data.type,
      active: parsed.data.active,
      notes: parsed.data.notes || null,
    },
  });

  revalidatePath("/admin/redirects");
  return {};
}

export async function toggleRedirectActiveAction(id: string, active: boolean) {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated.");
  if (!isDatabaseConfigured()) return;

  await prisma.redirect.update({ where: { id }, data: { active } });
  revalidatePath("/admin/redirects");
}
