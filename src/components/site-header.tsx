import Link from "next/link";
import { LUMA_URL, SITE_TITLE, TELEGRAM_URL } from "@/lib/types";
import { OpenPageMark } from "@/components/open-page-mark";

export function SiteHeader() {
  return (
    <header className="px-6 pt-8 sm:px-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-3 rounded-2xl"
        >
          <OpenPageMark />
          <span className="text-[15px] font-semibold tracking-tight text-ink">
            {SITE_TITLE}
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <a
            href={LUMA_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full px-3 text-sm text-mute transition-colors hover:text-ink"
          >
            Luma
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full px-3 text-sm text-mute transition-colors hover:text-ink"
          >
            Telegram
          </a>
          <Link
            href="/submit"
            className="inline-flex min-h-11 items-center rounded-full bg-ember px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Enviar proyecto
          </Link>
        </nav>
      </div>
    </header>
  );
}
