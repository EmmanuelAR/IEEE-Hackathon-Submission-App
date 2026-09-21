import Link from "next/link";
import {
  PROTOTYPE_LABELS,
  STATUS_LABELS,
  type Submission,
} from "@/lib/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
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
    <div className="mt-10 overflow-x-auto rounded-3xl bg-white shadow-[0_1px_2px_rgba(17,17,17,0.04)]">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-line text-mute">
            <th className="px-5 py-4 font-medium">Equipo</th>
            <th className="px-5 py-4 font-medium">Contacto</th>
            <th className="px-5 py-4 font-medium">Tipo</th>
            <th className="px-5 py-4 font-medium">Estado</th>
            <th className="px-5 py-4 font-medium">Enviado</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id} className="border-b border-line last:border-0">
              <td className="px-5 py-4">
                <Link
                  href={`/admin/${submission.id}`}
                  className="font-medium text-ink underline-offset-4 hover:underline"
                >
                  {submission.team_name}
                </Link>
              </td>
              <td className="px-5 py-4 text-mute">{submission.contact_email}</td>
              <td className="px-5 py-4 text-mute">
                {PROTOTYPE_LABELS[submission.prototype_type]}
              </td>
              <td className="px-5 py-4">
                <span className="rounded-full bg-mist px-2.5 py-1 text-xs text-ink">
                  {STATUS_LABELS[submission.status]}
                </span>
              </td>
              <td className="px-5 py-4 tabular-nums text-mute">
                {formatDate(submission.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
