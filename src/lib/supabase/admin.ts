import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Submission } from "@/lib/types";

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY",
    );
  }

  if (!adminClient) {
    adminClient = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return adminClient;
}

export function isUniqueTeamNameError(error: { code?: string; message?: string }) {
  return (
    error.code === "23505" ||
    /submissions_team_name/i.test(error.message ?? "") ||
    /duplicate key/i.test(error.message ?? "")
  );
}

export async function getSubmission(id: string) {
  const { data, error } = await getSupabaseAdmin()
    .from("submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return (data as Submission | null) ?? null;
}

export async function listSubmissions() {
  const { data, error } = await getSupabaseAdmin()
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Submission[];
}
