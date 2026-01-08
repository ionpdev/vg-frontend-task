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
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Vega Portfolio
          </p>
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="text-sm text-slate-500">
            Use the same value for username and password.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="block space-y-2 text-sm">
            <span className="text-slate-500">Username</span>
            <input
              className="w-full rounded-md border border-[rgb(var(--border))] bg-transparent px-3 py-2 text-sm"
              onChange={onUsernameChange}
              placeholder="demo"
              type="text"
              value={username}
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-slate-500">Password</span>
            <input
              className="w-full rounded-md border border-[rgb(var(--border))] bg-transparent px-3 py-2 text-sm"
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
              className="rounded-md bg-[rgb(var(--primary))] px-5 py-2 text-sm font-semibold text-white"
              type="submit"
            >
              Continue
            </button>
            <Link className="text-sm text-slate-500" to="/">
              Back home
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
