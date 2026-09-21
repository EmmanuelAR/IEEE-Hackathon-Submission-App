import type { Metadata } from "next";
import { SubmitForm } from "@/components/submit-form";
import { areSubmissionsOpen } from "@/lib/supabase/admin";
import { TELEGRAM_URL } from "@/lib/types";

export const metadata: Metadata = {
  title: "Enviar proyecto",
};

export const dynamic = "force-dynamic";

export default async function SubmitPage() {
  const open = await areSubmissionsOpen();

  return (
    <div className="px-6 py-16 sm:px-10">
      <div className="rise mx-auto max-w-2xl">
        <p className="text-sm font-medium text-mute">
          {open ? "Envío · lunes 21" : "Envíos cerrados"}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {open ? "Enviar proyecto" : "Envíos cerrados"}
        </h1>
        {open ? (
          <>
            <p className="mt-4 max-w-lg text-base leading-7 text-mute">
              Solo una persona del equipo envía. Pitch de 3–4 minutos el martes
              22. Un prototipo liviano basta: slides, Figma, demo o video.
            </p>
            <div className="mt-12">
              <SubmitForm />
            </div>
          </>
        ) : (
          <div className="mt-6 max-w-lg">
            <p className="text-base leading-7 text-mute">
              Los organizadores cerraron los envíos. Cuando los abran de nuevo,
              el formulario vuelve a aparecer aquí.
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-sm font-medium text-white"
            >
              Canal de Telegram
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
