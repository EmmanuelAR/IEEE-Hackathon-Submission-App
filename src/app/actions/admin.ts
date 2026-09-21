"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminToken,
  isValidAdminToken,
} from "@/lib/admin-auth";
import { getSupabaseAdmin, setSubmissionsOpen } from "@/lib/supabase/admin";
import { SUBMISSION_STATUSES, type SubmissionStatus } from "@/lib/types";

export type AdminLoginState = { error?: string } | null;

export async function isAdminAuthenticated() {
  const store = await cookies();
  return isValidAdminToken(store.get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }
}

export async function loginAdmin(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return { error: "ADMIN_PASSWORD no está configurada en el servidor." };
  }

  if (password !== expected) {
    return { error: "Contraseña incorrecta." };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, await createAdminToken(), adminCookieOptions());
  redirect("/admin");
}

export async function logoutAdmin() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin");
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
) {
  await requireAdmin();

  if (!SUBMISSION_STATUSES.includes(status)) {
    throw new Error("Estado inválido");
  }

  const { error } = await getSupabaseAdmin()
    .from("submissions")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error("No se pudo actualizar el estado");
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/${id}`);
}

export async function toggleSubmissions(formData: FormData) {
  await requireAdmin();

  const open = String(formData.get("open") ?? "") === "1";
  await setSubmissionsOpen(open);

  revalidatePath("/", "layout");
  revalidatePath("/submit");
  revalidatePath("/admin");
}
