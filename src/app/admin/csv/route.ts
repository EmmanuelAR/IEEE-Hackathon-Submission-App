import { isAdminAuthenticated } from "@/app/actions/admin";
import { listSubmissions } from "@/lib/supabase/admin";

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const submissions = await listSubmissions();
  const headers = [
    "id",
    "created_at",
    "status",
    "team_name",
    "contact_email",
    "members",
    "one_liner",
    "problem",
    "solution",
    "prototype_type",
    "prototype_url",
    "pitch_slides_url",
    "github_url",
    "video_url",
    "file_path",
    "notes",
    "clasypcs_confirmed",
  ];

  const lines = [
    headers.join(","),
    ...submissions.map((row) =>
      [
        row.id,
        row.created_at,
        row.status,
        row.team_name,
        row.contact_email,
        row.members
          .map((member) => `${member.name} <${member.email}>`)
          .join("; "),
        row.one_liner,
        row.problem,
        row.solution,
        row.prototype_type,
        row.prototype_url ?? "",
        row.pitch_slides_url ?? "",
        row.github_url ?? "",
        row.video_url ?? "",
        row.file_path ?? "",
        row.notes ?? "",
        String(row.clasypcs_confirmed),
      ]
        .map((value) => csvEscape(String(value)))
        .join(","),
    ),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="hackathon-submissions.csv"',
    },
  });
}
