"use server";

import { redirect } from "next/navigation";
import {
  areSubmissionsOpen,
  getSupabaseAdmin,
  isUniqueTeamNameError,
} from "@/lib/supabase/admin";
import {
  firstFieldError,
  hasDeliverable,
  membersFromFormData,
  submissionFieldsSchema,
} from "@/lib/validations";

export type SubmitState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
} | null;

export async function submitProject(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  if (!(await areSubmissionsOpen())) {
    return {
      error:
        "Los envíos están cerrados. Si crees que es un error, escribe en Telegram.",
    };
  }

  const parsed = submissionFieldsSchema.safeParse({
    team_name: formData.get("team_name"),
    contact_email: formData.get("contact_email"),
    members: membersFromFormData(formData),
    one_liner: formData.get("one_liner"),
    problem: formData.get("problem"),
    solution: formData.get("solution"),
    prototype_url: formData.get("prototype_url") ?? "",
    pitch_slides_url: formData.get("pitch_slides_url") ?? "",
    notes: formData.get("notes") ?? "",
    clasypcs_confirmed: formData.get("clasypcs_confirmed") === "on",
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      error: firstFieldError(fieldErrors) ?? "Revisa los campos marcados",
      fieldErrors: fieldErrors as Record<string, string[]>,
    };
  }

  if (!hasDeliverable(parsed.data)) {
    return {
      error: "Agrega el enlace del prototipo o las slides.",
    };
  }

  const fields = parsed.data;
  let insertedId: string;

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("submissions")
      .insert({
        team_name: fields.team_name,
        members: fields.members,
        contact_email: fields.contact_email,
        one_liner: fields.one_liner,
        problem: fields.problem,
        solution: fields.solution,
        prototype_type: "other",
        prototype_url: fields.prototype_url ?? null,
        pitch_slides_url: fields.pitch_slides_url ?? null,
        github_url: null,
        video_url: null,
        notes: fields.notes ?? null,
        clasypcs_confirmed: true,
        status: "received",
      })
      .select("id")
      .single();

    if (error) {
      if (isUniqueTeamNameError(error)) {
        return {
          error:
            "Ya existe un equipo con este nombre. Elige otro o agrega un sufijo.",
          fieldErrors: {
            team_name: [
              "Ya existe un equipo con este nombre. Elige otro o agrega un sufijo.",
            ],
          },
        };
      }
      return { error: "No pudimos guardar el envío. Inténtalo de nuevo." };
    }

    insertedId = data.id as string;
  } catch {
    return {
      error:
        "El servidor no está configurado. Faltan las variables de Supabase.",
    };
  }

  redirect(`/gracias?id=${insertedId}`);
}
