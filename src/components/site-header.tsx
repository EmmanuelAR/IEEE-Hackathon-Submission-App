import Link from "next/link";
import { OpenPageMark } from "@/components/open-page-mark";
import { areSubmissionsOpen } from "@/lib/supabase/admin";
import { LUMA_URL, SITE_TITLE, TELEGRAM_URL } from "@/lib/types";

export async function SiteHeader() {
  const open = await areSubmissionsOpen();

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
            className={
              open
                ? "inline-flex min-h-11 items-center rounded-full bg-ember px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
                : "inline-flex min-h-11 items-center rounded-full bg-mist px-4 text-sm font-medium text-mute"
            }
          >
            {open ? "Enviar proyecto" : "Envíos cerrados"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
