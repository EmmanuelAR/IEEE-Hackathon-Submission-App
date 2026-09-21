import type { Metadata } from "next";
import { SubmitForm } from "@/components/submit-form";

export const metadata: Metadata = {
  title: "Enviar proyecto",
};

export default function SubmitPage() {
  return (
    <div className="px-6 py-16 sm:px-10">
      <div className="rise mx-auto max-w-2xl">
        <p className="text-sm font-medium text-mute">Envío · lunes 21</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Enviar proyecto
        </h1>
        <p className="mt-4 max-w-lg text-base leading-7 text-mute">
          Pitch de 3–4 minutos el martes 22. Un prototipo liviano basta: slides,
          Figma, demo o video.
        </p>
        <div className="mt-12">
          <SubmitForm />
        </div>
      </div>
    </div>
  );
}
