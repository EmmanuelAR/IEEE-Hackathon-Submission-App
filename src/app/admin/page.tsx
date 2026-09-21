import type { Metadata } from "next";
import Link from "next/link";
import { isAdminAuthenticated, logoutAdmin } from "@/app/actions/admin";
import { AdminLoginForm } from "@/components/admin-login-form";
import { AdminTable } from "@/components/admin-table";
import { SubmissionsToggle } from "@/components/submissions-toggle";
import { areSubmissionsOpen, listSubmissions } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    return (
      <div className="px-6 py-16 sm:px-10">
        <div className="rise mx-auto max-w-5xl">
          <p className="text-sm font-medium text-mute">Organizadores</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Admin</h1>
          <p className="mt-4 max-w-md text-mute">
            Lista de envíos, detalle y exportar CSV.
          </p>
          <AdminLoginForm />
        </div>
      </div>
    );
  }

  let submissions;
  let submissionsOpen = true;
  try {
    [submissions, submissionsOpen] = await Promise.all([
      listSubmissions(),
      areSubmissionsOpen(),
    ]);
  } catch {
    return (
      <div className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-semibold tracking-tight">Envíos</h1>
          <p className="mt-4 max-w-md text-mute">
            Faltan las variables de Supabase en el servidor. Agrégalas y recarga.
          </p>
          <form action={logoutAdmin} className="mt-6">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center text-sm text-mute hover:text-ink"
            >
              Salir
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-mute">Organizadores</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Envíos
            </h1>
            <p className="mt-3 text-mute">
              {submissions.length}{" "}
              {submissions.length === 1 ? "proyecto" : "proyectos"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* File download, not a client navigation */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/admin/csv"
              className="inline-flex min-h-11 items-center rounded-full bg-ember px-4 text-sm font-medium text-white"
            >
              Exportar CSV
            </a>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-mute hover:text-ink"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
        <SubmissionsToggle open={submissionsOpen} />
        <AdminTable submissions={submissions} />
        <p className="mt-8 text-sm text-mute">
          <Link href="/" className="text-ink underline-offset-4 hover:underline">
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
