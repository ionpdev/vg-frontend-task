import type { FC } from "react"
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"
import { DashboardView } from "../components/DashboardView"
import { useDashboardViewModel } from "../hooks/useDashboardViewModel"
import { isAuthed, logout } from "../libs/auth/auth"
import { useAuth } from "../libs/auth/useAuth"

const DashboardPage: FC = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const viewModel = useDashboardViewModel()

  const handleLogout = () => {
    logout()
    setUser(null)
    void navigate({ to: "/" })
  }

  return (
    <DashboardView
      badge="Vega Portfolio"
      title="Dashboard"
      onLogout={handleLogout}
      viewModel={viewModel}
    />
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
