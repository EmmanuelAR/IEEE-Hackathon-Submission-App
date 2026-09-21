import { updateSubmissionStatus } from "@/app/actions/admin";
import { STATUS_LABELS, type Submission, type SubmissionStatus } from "@/lib/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-mute">
        {label}
      </p>
      <div className="mt-2 text-sm leading-6 text-ink">{children}</div>
    </div>
  );
}

function ExternalLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="break-all underline-offset-4 hover:underline"
    >
      {href}
    </a>
  );
}

export function AdminTable({ submissions }: { submissions: Submission[] }) {
  if (submissions.length === 0) {
    return (
      <p className="mt-10 text-mute">
        Todavía no hay envíos. Cuando un equipo envíe, aparece aquí.
      </p>
    );
  }

  return (
    <div className="mt-10 space-y-6">
      {submissions.map((submission) => {
        const nextStatus: SubmissionStatus =
          submission.status === "received" ? "reviewed" : "received";
        const links = [
          ["Prototipo", submission.prototype_url],
          ["Slides", submission.pitch_slides_url],
          ["GitHub", submission.github_url],
          ["Video", submission.video_url],
        ].filter((entry): entry is [string, string] => Boolean(entry[1]));

        return (
          <article
            key={submission.id}
            className="rounded-3xl bg-white px-5 py-6 shadow-[0_1px_2px_rgba(17,17,17,0.04)] sm:px-7"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {submission.team_name}
                </h2>
                <p className="mt-2 text-base leading-7 text-mute">
                  {submission.one_liner}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-mist px-2.5 py-1 text-xs text-ink">
                  {STATUS_LABELS[submission.status]}
                </span>
                <p className="text-sm tabular-nums text-mute">
                  {formatDate(submission.created_at)}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Field label="Contacto">{submission.contact_email}</Field>
              <Field label="Integrantes">
                <ul className="space-y-1">
                  {submission.members.map((member) => (
                    <li key={`${member.email}-${member.name}`}>
                      {member.name} · {member.email}
                    </li>
                  ))}
                </ul>
              </Field>
            </div>

            <div className="mt-6 space-y-6">
              <Field label="Problema">
                <p className="whitespace-pre-wrap">{submission.problem}</p>
              </Field>
              <Field label="Solución">
                <p className="whitespace-pre-wrap">{submission.solution}</p>
              </Field>
              {links.length > 0 ? (
                <Field label="Enlaces">
                  <ul className="space-y-2">
                    {links.map(([label, href]) => (
                      <li key={label}>
                        <span className="text-mute">{label} · </span>
                        <ExternalLink href={href} />
                      </li>
                    ))}
                  </ul>
                </Field>
              ) : null}
              {submission.notes ? (
                <Field label="Notas">
                  <p className="whitespace-pre-wrap">{submission.notes}</p>
                </Field>
              ) : null}
            </div>

            <form
              action={updateSubmissionStatus.bind(
                null,
                submission.id,
                nextStatus,
              )}
              className="mt-8"
            >
              <button
                type="submit"
                className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-mute hover:text-ink"
              >
                Marcar como {STATUS_LABELS[nextStatus].toLowerCase()}
              </button>
            </form>
          </article>
        );
      })}
    </div>
  );
}
