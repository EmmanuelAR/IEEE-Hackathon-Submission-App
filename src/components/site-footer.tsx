import { LUMA_URL } from "@/lib/types";

export function SiteFooter() {
  return (
    <footer className="mt-auto px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 text-sm text-mute sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-md space-y-1">
          <p>Hackathon Lectura @ CLASYPCS · San José</p>
          <p>
            Organizado por Emmanuel Agüero y Sebastián Ceciliano, embajadores
            SpaceXAI. Facilitación; sin sponsorship oficial de SpaceX.
          </p>
        </div>
        <div className="space-y-1 sm:text-right">
          <p>Luma = registro · esta app = envíos</p>
          <a
            href={LUMA_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-ink underline-offset-4 hover:underline"
          >
            luma.com/3ydsbpap
          </a>
        </div>
      </div>
    </footer>
  );
}
