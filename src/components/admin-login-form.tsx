"use client";

import { useActionState } from "react";
import { loginAdmin, type AdminLoginState } from "@/app/actions/admin";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState<AdminLoginState, FormData>(
    loginAdmin,
    null,
  );

  return (
    <form action={formAction} className="mt-10 max-w-sm space-y-6">
      {state?.error ? (
        <div
          role="alert"
          className="rounded-2xl bg-[#fff4f2] px-4 py-3 text-sm text-[#b42318]"
        >
          {state.error}
        </div>
      ) : null}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center rounded-full bg-ember px-6 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
