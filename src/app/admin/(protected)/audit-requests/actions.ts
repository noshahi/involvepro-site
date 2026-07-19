"use server";

import { revalidatePath } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { getSession } from "@/lib/session";
import { submissionStatusSchema } from "@/lib/admin-schemas";

export async function updateAuditStatusAction(id: string, status: string) {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated.");
  if (!isDatabaseConfigured()) return;

  const parsed = submissionStatusSchema.safeParse(status);
  if (!parsed.success) return;

  await prisma.auditRequest.update({ where: { id }, data: { status: parsed.data } });
  revalidatePath("/admin/audit-requests");
}
