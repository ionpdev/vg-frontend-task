import type { FC } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { HomeView } from "../components/HomeView"
import { logout } from "../libs/auth/auth"
import { useAuth } from "../libs/auth/useAuth"

const HomePage: FC = () => {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  const handleLogout = () => {
    logout()
    setUser(null)
    void navigate({ to: "/" })
  }

  return (
    <HomeView isAuthenticated={Boolean(user)} onLogout={handleLogout} />
  )
}

export const Route = createFileRoute("/")({
  component: HomePage,
})
