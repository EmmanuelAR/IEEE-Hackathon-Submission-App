"use client";

import { useEffect } from "react";
import { INSTALL_TUTORIAL_URL } from "@/lib/types";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export function InstagramTutorial() {
  useEffect(() => {
    const process = () => window.instgrm?.Embeds.process();

    if (window.instgrm) {
      process();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = process;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_1px_2px_rgba(17,17,17,0.04)]">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={INSTALL_TUTORIAL_URL}
        data-instgrm-version="14"
        style={{
          background: "#fff",
          border: 0,
          margin: 0,
          maxWidth: "100%",
          width: "100%",
        }}
      >
        <a
          href={INSTALL_TUTORIAL_URL}
          target="_blank"
          rel="noreferrer"
          className="block px-5 py-16 text-center text-sm text-mute"
        >
          Ver tutorial en Instagram
        </a>
      </blockquote>
      <p className="border-t border-line px-5 py-4 text-sm text-mute">
        Si no se ve embebido,{" "}
        <a
          href={INSTALL_TUTORIAL_URL}
          target="_blank"
          rel="noreferrer"
          className="text-ink underline-offset-4 hover:underline"
        >
          ábrelo en Instagram
        </a>
        .
      </p>
    </div>
  );
}
