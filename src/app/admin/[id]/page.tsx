import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  requireAdmin,
  updateSubmissionStatus,
} from "@/app/actions/admin";
import { getSupabaseAdmin, getSubmission } from "@/lib/supabase/admin";
import {
  PROTOTYPE_LABELS,
  STATUS_LABELS,
  STORAGE_BUCKET,
  type SubmissionStatus,
} from "@/lib/types";

export const metadata: Metadata = {
  title: "Detalle",
};

export const dynamic = "force-dynamic";

function LinkRow({
  label,
  href,
}: {
  label: string;
  href: string | null;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-mute">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block break-all text-ink underline-offset-4 hover:underline"
        >
          {href}
        </a>
      ) : (
        <p className="mt-2 text-mute">—</p>
      )}
    </div>
  );
}

export default async function AdminDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  let submission;
  try {
    submission = await getSubmission(id);
  } catch {
    return (
      <div className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight">Detalle</h1>
          <p className="mt-4 text-mute">
            Faltan las variables de Supabase en el servidor. Agrégalas y recarga.
          </p>
        </div>
      </div>
    );
  }
  if (!submission) notFound();

  let fileUrl: string | null = null;
  if (submission.file_path) {
    const { data } = await getSupabaseAdmin()
      .storage.from(STORAGE_BUCKET)
      .createSignedUrl(submission.file_path, 60 * 30);
    fileUrl = data?.signedUrl ?? null;
  }

  const nextStatus: SubmissionStatus =
    submission.status === "received" ? "reviewed" : "received";

  return (
    <div className="px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/admin"
          className="inline-flex min-h-11 items-center text-sm text-mute hover:text-ink"
        >
          Todos los envíos
        </Link>
        <p className="mt-8 text-sm font-medium text-mute">
          {STATUS_LABELS[submission.status]} ·{" "}
          {PROTOTYPE_LABELS[submission.prototype_type]}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {submission.team_name}
        </h1>
        <p className="mt-4 text-lg text-mute">{submission.one_liner}</p>

        <form
          action={updateSubmissionStatus.bind(null, submission.id, nextStatus)}
          className="mt-6"
        >
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-full bg-ember px-4 text-sm font-medium text-white"
          >
            Marcar como {STATUS_LABELS[nextStatus].toLowerCase()}
          </button>
        </form>

        <div className="mt-12 space-y-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-mute">
              Contacto
            </p>
            <p className="mt-2">{submission.contact_email}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-mute">
              Integrantes
            </p>
            <ul className="mt-2 space-y-1">
              {submission.members.map((member) => (
                <li key={`${member.email}-${member.name}`}>
                  {member.name} · {member.email}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-mute">
              Problema
            </p>
            <p className="mt-2 whitespace-pre-wrap leading-7">
              {submission.problem}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-mute">
              Solución
            </p>
            <p className="mt-2 whitespace-pre-wrap leading-7">
              {submission.solution}
            </p>
          </div>
          <LinkRow label="Prototipo" href={submission.prototype_url} />
          <LinkRow label="Slides" href={submission.pitch_slides_url} />
          <LinkRow label="GitHub" href={submission.github_url} />
          <LinkRow label="Video" href={submission.video_url} />
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-mute">
              Archivo
            </p>
            {fileUrl ? (
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-ink underline-offset-4 hover:underline"
              >
                Descargar archivo
              </a>
            ) : (
              <p className="mt-2 text-mute">—</p>
            )}
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-mute">
              Notas
            </p>
            <p className="mt-2 whitespace-pre-wrap leading-7 text-mute">
              {submission.notes || "—"}
            </p>
          </div>
          <p className="font-mono text-xs text-mute">id {submission.id}</p>
        </div>
      </div>
    </div>
  );
}
