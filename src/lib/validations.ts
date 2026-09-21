import { z } from "zod";
import { MAX_MEMBERS } from "@/lib/types";

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined))
  .refine(
    (value) => !value || /^https?:\/\/.+/i.test(value),
    "Usa una URL que empiece con http:// o https://",
  );

const emailField = z
  .string()
  .trim()
  .min(1, "El correo es obligatorio")
  .email("Correo inválido");

export const memberSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(80),
  email: emailField,
});

export const submissionFieldsSchema = z.object({
  team_name: z
    .string()
    .trim()
    .min(2, "El nombre del equipo es muy corto")
    .max(80, "Máximo 80 caracteres"),
  contact_email: emailField,
  members: z
    .array(memberSchema)
    .min(1, "Agrega al menos un integrante")
    .max(MAX_MEMBERS, "Máximo 4 integrantes"),
  one_liner: z
    .string()
    .trim()
    .min(8, "Describe la idea en una frase")
    .max(180, "Máximo 180 caracteres"),
  problem: z
    .string()
    .trim()
    .min(20, "Cuenta el problema con un poco más de detalle")
    .max(2000),
  solution: z
    .string()
    .trim()
    .min(20, "Cuenta la solución y cómo usas IA")
    .max(2000),
  prototype_url: optionalUrl,
  pitch_slides_url: optionalUrl,
  notes: z
    .string()
    .trim()
    .max(1000, "Máximo 1000 caracteres")
    .optional()
    .transform((value) => (value ? value : undefined)),
  clasypcs_confirmed: z.literal(true, {
    message: "Todos los integrantes deben ser participantes de CLASYPCS",
  }),
});

export type SubmissionFields = z.infer<typeof submissionFieldsSchema>;

export function hasDeliverable(
  fields: Pick<SubmissionFields, "prototype_url" | "pitch_slides_url">,
): boolean {
  return Boolean(fields.prototype_url || fields.pitch_slides_url);
}

export function membersFromFormData(formData: FormData) {
  const members: { name: string; email: string }[] = [];

  for (let index = 0; index < MAX_MEMBERS; index += 1) {
    const name = String(formData.get(`member_name_${index}`) ?? "").trim();
    const email = String(formData.get(`member_email_${index}`) ?? "").trim();
    if (!name && !email) continue;
    members.push({ name, email });
  }

  return members;
}

export function firstFieldError(
  fieldErrors: Record<string, string[] | undefined>,
): string | undefined {
  for (const messages of Object.values(fieldErrors)) {
    if (messages?.[0]) return messages[0];
  }
  return undefined;
}
