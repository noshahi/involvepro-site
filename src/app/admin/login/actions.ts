"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { isAdminAuthConfigured } from "@/lib/auth";
import { setSessionCookie } from "@/lib/session";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
  from: z.string().trim().optional(),
});

export type LoginState = { error?: string };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminAuthConfigured()) {
    return { error: "Admin login is not configured on this server yet." };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    from: formData.get("from") ?? undefined,
  });

  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  const { email, password, from } = parsed.data;

  const adminEmail = process.env.ADMIN_EMAIL!.trim().toLowerCase();
  if (email.trim().toLowerCase() !== adminEmail) {
    return { error: "Invalid email or password." };
  }

  const isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!);
  if (!isValid) {
    return { error: "Invalid email or password." };
  }

  await setSessionCookie({ email: adminEmail, role: "ADMIN" });

  const destination = from && from.startsWith("/admin") ? from : "/admin";
  redirect(destination);
}

export async function logoutAction() {
  const { clearSessionCookie } = await import("@/lib/session");
  await clearSessionCookie();
  redirect("/admin/login");
}
