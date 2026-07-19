"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginForm({ from }: { from?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="from" value={from ?? ""} />

      <div>
        <label htmlFor="email" className="mb-1 block text-xs font-medium text-white/70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-green"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-xs font-medium text-white/70">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-green"
        />
      </div>

      {state.error && (
        <p className="rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-200">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-brand-green px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-green-deep disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
