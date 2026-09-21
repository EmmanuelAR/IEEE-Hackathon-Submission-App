import type { Metadata } from "next";
import Link from "next/link";
import { LUMA_URL } from "@/lib/types";

export const metadata: Metadata = {
  title: "Recibimos tu proyecto",
};

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <div className="px-6 py-24 sm:px-10">
      <div className="rise mx-auto max-w-2xl">
        <p className="text-sm font-medium text-mute">Listo</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
          Recibimos tu proyecto.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-8 text-mute">
          Prepárense para un pitch de 3–4 minutos el martes 22 por la mañana.
        </p>
        {id ? (
          <p className="mt-10 rounded-2xl bg-white px-5 py-4 text-sm text-mute shadow-[0_1px_2px_rgba(17,17,17,0.04)]">
            Id de envío
            <span className="mt-1 block font-mono text-base tracking-tight text-ink">
              {id}
            </span>
          </p>
        ) : null}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-ember px-6 text-base font-medium text-white"
          >
            Volver al inicio
          </Link>
          <a
            href={LUMA_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full px-6 text-base text-ink hover:bg-mist"
          >
            Ver el evento en Luma
          </a>
        </div>
      </div>
    </div>
  );
}
