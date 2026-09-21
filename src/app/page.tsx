import Link from "next/link";
import { OpenPageMark } from "@/components/open-page-mark";
import { SetupGuide } from "@/components/setup-guide";
import { LUMA_URL, TELEGRAM_URL } from "@/lib/types";

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden px-6 pb-8 pt-16 sm:px-10 sm:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-10 hidden opacity-80 sm:block"
      >
        <OpenPageMark className="h-64 w-64" />
      </div>

      <div className="rise mx-auto max-w-5xl">
        <p className="text-sm font-medium tracking-wide text-mute">
          Hackathon Lectura · San José @ CLASYPCS
        </p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-ink sm:text-7xl sm:leading-[0.95]">
          Haz que leer
          <br />
          sea irresistible.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-mute">
          Crea una solución con IA para fomentar la lectura en estudiantes de 8
          a 15 años. Autores clásicos y locales. Sin tedio.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/submit"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-ember px-6 text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            Enviar proyecto
          </Link>
          <a
            href={LUMA_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full px-6 text-base text-ink transition-colors hover:bg-mist"
          >
            Registro en Luma
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full px-6 text-base text-ink transition-colors hover:bg-mist"
          >
            Canal de Telegram
          </a>
        </div>

        <div className="mt-16 grid max-w-2xl gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-white px-6 py-5 shadow-[0_1px_2px_rgba(17,17,17,0.04)]">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-mute">
              Lunes 21 de septiembre
            </p>
            <p className="mt-2 text-base leading-7 text-ink">
              Workshop, mentoring y prototipo liviano. Los equipos siguen de
              noche.
            </p>
          </div>
          <div className="rounded-3xl bg-white px-6 py-5 shadow-[0_1px_2px_rgba(17,17,17,0.04)]">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-mute">
              Martes 22 · pitches
            </p>
            <p className="mt-2 text-base leading-7 text-ink">
              Pitch de 3–4 minutos + slides, Figma, demo o video corto.
            </p>
          </div>
        </div>

        <SetupGuide />
      </div>
    </div>
  );
}
