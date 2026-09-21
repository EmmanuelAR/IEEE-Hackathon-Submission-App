import { toggleSubmissions } from "@/app/actions/admin";

export function SubmissionsToggle({ open }: { open: boolean }) {
  return (
    <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-white px-5 py-5 shadow-[0_1px_2px_rgba(17,17,17,0.04)] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-ink">Envíos de proyectos</p>
        <p className="mt-1 text-sm text-mute">
          {open
            ? "Los equipos pueden enviar ahora."
            : "El formulario está cerrado para todos."}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            open ? "bg-ember-soft text-ink" : "bg-mist text-mute"
          }`}
        >
          {open ? "Abiertos" : "Cerrados"}
        </span>
        <form action={toggleSubmissions}>
          <input type="hidden" name="open" value={open ? "0" : "1"} />
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {open ? "Cerrar envíos" : "Abrir envíos"}
          </button>
        </form>
      </div>
    </div>
  );
}
