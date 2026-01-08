import type { ChangeEvent, FC, FormEvent } from "react"
import { Link } from "@tanstack/react-router"

export interface LoginViewProps {
  username: string
  password: string
  errorMessage?: string
  onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export const LoginView: FC<LoginViewProps> = ({
  username,
  password,
  errorMessage,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute -left-16 top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(var(--primary),0.18),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute -right-20 bottom-4 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(var(--primary),0.14),transparent_65%)] blur-2xl" />
      <div className="relative w-full max-w-md rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgb(var(--fg))]/60">
            Vega Portfolio
          </p>
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="text-sm text-[rgb(var(--fg))]/60">
            Use the same value for username and password.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="block space-y-2 text-sm">
            <span className="text-[rgb(var(--fg))]/60">Username</span>
            <input
              className="w-full rounded-md border border-[rgb(var(--border))] bg-transparent px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[rgba(var(--primary),0.25)]"
              onChange={onUsernameChange}
              placeholder="demo"
              type="text"
              value={username}
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-[rgb(var(--fg))]/60">Password</span>
            <input
              className="w-full rounded-md border border-[rgb(var(--border))] bg-transparent px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[rgba(var(--primary),0.25)]"
              onChange={onPasswordChange}
              placeholder="demo"
              type="password"
              value={password}
            />
          </label>

          {errorMessage ? (
            <p className="text-sm text-red-500">{errorMessage}</p>
          ) : null}

          <div className="flex items-center gap-3">
            <button
              className="rounded-md bg-[rgb(var(--primary))] px-5 py-2 text-sm font-semibold text-white transition hover:brightness-95 active:brightness-90"
              type="submit"
            >
              Continue
            </button>
            <Link
              className="text-sm text-[rgb(var(--fg))]/60 transition hover:text-[rgb(var(--fg))]"
              to="/"
            >
              Back home
            </Link>
          </div>
        </form>
        <div className="mt-6 rounded-xl border border-[rgb(var(--border))] bg-[rgba(var(--fg),0.03)] px-4 py-3 text-xs text-[rgb(var(--fg))]/70">
          Demo access: <span className="font-semibold">demo / demo</span>
        </div>
      </div>
    </div>
  )
}
