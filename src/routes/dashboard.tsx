import type { FC } from "react"
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router"
import { isAuthed, logout } from "../libs/auth/auth"
import { useAuth } from "../libs/auth/useAuth"

const DashboardPage: FC = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const handleLogout = () => {
    logout()
    setUser(null)
    void navigate({ to: "/" })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Vega Portfolio
          </p>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            className="rounded-md border border-[rgb(var(--border))] px-4 py-2 text-sm font-semibold"
            to="/"
          >
            Back home
          </Link>
          <button
            className="rounded-md border border-[rgb(var(--border))] px-4 py-2 text-sm font-semibold"
            onClick={handleLogout}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-500">Widgets and Graphs.</p>
    </div>
  )
}

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    if (!isAuthed()) {
      throw redirect({ to: "/login" })
    }
  },
  component: DashboardPage,
})
