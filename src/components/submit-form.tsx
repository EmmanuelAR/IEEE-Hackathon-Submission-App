"use client";

import { useActionState, useState } from "react";
import { submitProject, type SubmitState } from "@/app/actions/submit";
import { MAX_MEMBERS, PROTOTYPE_LABELS, PROTOTYPE_TYPES } from "@/lib/types";

const emptyMember = { name: "", email: "" };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm text-[#b42318]">{message}</p>;
}

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
      {children}
      {optional ? (
        <span className="ml-2 font-normal text-mute">Opcional</span>
      ) : null}
    </label>
  );
}

const inputClass =
  "mt-2 min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-mute/70";
const areaClass =
  "mt-2 min-h-32 w-full resize-y rounded-2xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-mute/70";

export function SubmitForm() {
  const [state, formAction, pending] = useActionState<SubmitState, FormData>(
    submitProject,
    null,
  );
  const [members, setMembers] = useState([emptyMember]);

  const fieldErrors = state?.fieldErrors ?? {};

  function addMember() {
    if (members.length >= MAX_MEMBERS) return;
    setMembers((current) => [...current, emptyMember]);
  }

  function removeMember(index: number) {
    setMembers((current) =>
      current.length === 1 ? current : current.filter((_, i) => i !== index),
    );
  }

  return (
    <form action={formAction} className="space-y-10">
      {state?.error ? (
        <div
          role="alert"
          className="rounded-2xl bg-[#fff4f2] px-4 py-3 text-sm text-[#b42318]"
        >
          {state.error}
        </div>
      ) : null}

      <div>
        <Label htmlFor="team_name">Nombre del equipo</Label>
        <input
          id="team_name"
          name="team_name"
          required
          maxLength={80}
          className={inputClass}
          placeholder="Páginas Vivas"
        />
        <FieldError message={fieldErrors.team_name?.[0]} />
      </div>

      <div>
        <p className="text-sm font-medium text-ink">Integrantes · máximo 4</p>
        <p className="mt-2 text-sm leading-6 text-mute">
          Solo una persona del equipo debe enviar el proyecto.
        </p>
        <div className="mt-4 space-y-4">
          {members.map((member, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-3xl bg-mist p-4 sm:grid-cols-2"
            >
              <div>
                <Label htmlFor={`member_name_${index}`}>Nombre</Label>
                <input
                  id={`member_name_${index}`}
                  name={`member_name_${index}`}
                  required
                  value={member.name}
                  onChange={(event) => {
                    const value = event.target.value;
                    setMembers((current) =>
                      current.map((item, i) =>
                        i === index ? { ...item, name: value } : item,
                      ),
                    );
                  }}
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor={`member_email_${index}`}>Correo</Label>
                <input
                  id={`member_email_${index}`}
                  name={`member_email_${index}`}
                  type="email"
                  required
                  value={member.email}
                  onChange={(event) => {
                    const value = event.target.value;
                    setMembers((current) =>
                      current.map((item, i) =>
                        i === index ? { ...item, email: value } : item,
                      ),
                    );
                  }}
                  className={inputClass}
                />
              </div>
              {members.length > 1 ? (
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="min-h-11 justify-self-start text-sm text-mute hover:text-ink sm:col-span-2"
                >
                  Quitar integrante
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <FieldError message={fieldErrors.members?.[0]} />
        {members.length < MAX_MEMBERS ? (
          <button
            type="button"
            onClick={addMember}
            className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-ink"
          >
            Agregar integrante
          </button>
        ) : null}
      </div>

      <div>
        <Label htmlFor="contact_email">Correo de contacto principal</Label>
        <input
          id="contact_email"
          name="contact_email"
          type="email"
          required
          className={inputClass}
          placeholder="equipo@correo.com"
        />
        <FieldError message={fieldErrors.contact_email?.[0]} />
      </div>

      <div>
        <Label htmlFor="one_liner">En una frase</Label>
        <input
          id="one_liner"
          name="one_liner"
          required
          maxLength={180}
          className={inputClass}
          placeholder="Clásicos que se leen como un juego."
        />
        <FieldError message={fieldErrors.one_liner?.[0]} />
      </div>

      <div>
        <Label htmlFor="problem">Problema · lectura 8–15</Label>
        <textarea
          id="problem"
          name="problem"
          required
          className={areaClass}
          placeholder="Qué hace tediosa la lectura hoy, y para quién."
        />
        <FieldError message={fieldErrors.problem?.[0]} />
      </div>

      <div>
        <Label htmlFor="solution">Solución y uso de IA</Label>
        <textarea
          id="solution"
          name="solution"
          required
          className={areaClass}
          placeholder="Qué construyeron y dónde entra Grok, Cursor u otra IA."
        />
        <FieldError message={fieldErrors.solution?.[0]} />
      </div>

      <div>
        <Label htmlFor="prototype_type">Tipo de prototipo</Label>
        <select
          id="prototype_type"
          name="prototype_type"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Elige una opción
          </option>
          {PROTOTYPE_TYPES.map((type) => (
            <option key={type} value={type}>
              {PROTOTYPE_LABELS[type]}
            </option>
          ))}
        </select>
        <FieldError message={fieldErrors.prototype_type?.[0]} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="prototype_url">Enlace del prototipo</Label>
          <input
            id="prototype_url"
            name="prototype_url"
            type="url"
            className={inputClass}
            placeholder="https://"
          />
          <FieldError message={fieldErrors.prototype_url?.[0]} />
        </div>
        <div>
          <Label htmlFor="pitch_slides_url">Slides del pitch</Label>
          <input
            id="pitch_slides_url"
            name="pitch_slides_url"
            type="url"
            className={inputClass}
            placeholder="https://"
          />
          <FieldError message={fieldErrors.pitch_slides_url?.[0]} />
        </div>
        <div>
          <Label htmlFor="github_url" optional>
            GitHub
          </Label>
          <input
            id="github_url"
            name="github_url"
            type="url"
            className={inputClass}
            placeholder="https://github.com/..."
          />
          <FieldError message={fieldErrors.github_url?.[0]} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="video_url" optional>
            Video
          </Label>
          <input
            id="video_url"
            name="video_url"
            type="url"
            className={inputClass}
            placeholder="https://"
          />
          <FieldError message={fieldErrors.video_url?.[0]} />
        </div>
      </div>

      <div>
        <Label htmlFor="notes" optional>
          Notas para jueces
        </Label>
        <textarea id="notes" name="notes" className={areaClass} />
        <FieldError message={fieldErrors.notes?.[0]} />
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-ink">
        <input
          type="checkbox"
          name="clasypcs_confirmed"
          required
          className="mt-1 size-5 rounded border-line accent-ember"
        />
        <span>
          Confirmamos que todos los integrantes son participantes de CLASYPCS.
        </span>
      </label>
      <FieldError message={fieldErrors.clasypcs_confirmed?.[0]} />

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-ember px-7 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar proyecto"}
      </button>
    </form>
  );
}
