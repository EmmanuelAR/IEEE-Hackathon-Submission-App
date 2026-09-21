"use server";

import { redirect } from "next/navigation";
import { getSupabaseAdmin, isUniqueTeamNameError } from "@/lib/supabase/admin";
import { STORAGE_BUCKET } from "@/lib/types";
import {
  firstFieldError,
  hasDeliverable,
  membersFromFormData,
  submissionFieldsSchema,
  validateUpload,
} from "@/lib/validations";

export type SubmitState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
} | null;

function fileFromForm(formData: FormData) {
  const value = formData.get("file");
  if (!(value instanceof File) || value.size === 0) return null;
  return value;
}

export async function submitProject(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const parsed = submissionFieldsSchema.safeParse({
    team_name: formData.get("team_name"),
    contact_email: formData.get("contact_email"),
    members: membersFromFormData(formData),
    one_liner: formData.get("one_liner"),
    problem: formData.get("problem"),
    solution: formData.get("solution"),
    prototype_type: formData.get("prototype_type"),
    prototype_url: formData.get("prototype_url") ?? "",
    pitch_slides_url: formData.get("pitch_slides_url") ?? "",
    github_url: formData.get("github_url") ?? "",
    video_url: formData.get("video_url") ?? "",
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

  const file = fileFromForm(formData);
  const fileError = validateUpload(file);
  if (fileError) {
    return { error: fileError, fieldErrors: { file: [fileError] } };
  }

  if (!hasDeliverable(parsed.data, file)) {
    return {
      error:
        "Agrega el enlace del prototipo, las slides o un archivo. Hace falta al menos uno.",
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
        prototype_type: fields.prototype_type,
        prototype_url: fields.prototype_url ?? null,
        pitch_slides_url: fields.pitch_slides_url ?? null,
        github_url: fields.github_url ?? null,
        video_url: fields.video_url ?? null,
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

  if (file) {
    const safeName = file.name.replace(/[^\w.\-]+/g, "_");
    const path = `${insertedId}/${safeName}`;
    const { error: uploadError } = await getSupabaseAdmin()
      .storage.from(STORAGE_BUCKET)
      .upload(path, file, {
        contentType: file.type || undefined,
        upsert: false,
      });

    if (uploadError) {
      return {
        error:
          "El proyecto se guardó, pero el archivo no se pudo subir. Envíalo por URL o vuelve a intentar.",
      };
    }

    await getSupabaseAdmin()
      .from("submissions")
      .update({ file_path: path })
      .eq("id", insertedId);
  }

  redirect(`/gracias?id=${insertedId}`);
}
