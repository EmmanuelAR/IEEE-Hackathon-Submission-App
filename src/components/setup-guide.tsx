import {
  CURSOR_DOWNLOAD_URL,
  GROK_BOT_URL,
  INSTALL_TUTORIAL_URL,
} from "@/lib/types";
import { InstagramTutorial } from "@/components/instagram-tutorial";

export function SetupGuide() {
  return (
    <section className="mt-24 max-w-5xl">
      <p className="text-sm font-medium tracking-wide text-mute">
        Trae esto instalado
      </p>
      <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Cursor y Grok Bot, antes de llegar.
      </h2>
      <p className="mt-4 max-w-lg text-base leading-7 text-mute">
        Cada persona necesita una laptop con Cursor o Grok Bot. Baja ambos y
        mira el tutorial.
      </p>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2">
        <li className="rounded-3xl bg-white px-6 py-6 shadow-[0_1px_2px_rgba(17,17,17,0.04)]">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-mute">
            1 · Cursor
          </p>
          <p className="mt-3 text-lg font-medium tracking-tight text-ink">
            El editor del hackathon
          </p>
          <p className="mt-2 text-sm leading-6 text-mute">
            macOS, Windows o Linux. Elige tu sistema en la página de descarga.
          </p>
          <a
            href={CURSOR_DOWNLOAD_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-ember px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Descargar Cursor
          </a>
        </li>
        <li className="rounded-3xl bg-white px-6 py-6 shadow-[0_1px_2px_rgba(17,17,17,0.04)]">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-mute">
            2 · Grok Bot
          </p>
          <p className="mt-3 text-lg font-medium tracking-tight text-ink">
            El agente de xAI
          </p>
          <p className="mt-2 text-sm leading-6 text-mute">
            Instálalo junto a Cursor para construir y hacer el pitch.
          </p>
          <a
            href={GROK_BOT_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-ember px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Descargar Grok Bot
          </a>
        </li>
      </ol>

      <div className="mt-10 max-w-md">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-mute">
          3 · Tutorial
        </p>
        <p className="mt-3 text-base leading-7 text-mute">
          Cómo instalar Cursor y Grok Bot, paso a paso.
        </p>
        <a
          href={INSTALL_TUTORIAL_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-4 mb-6 inline-flex min-h-12 items-center justify-center rounded-full bg-ember px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Ver tutorial
        </a>
        <InstagramTutorial />
      </div>
    </section>
  );
}
