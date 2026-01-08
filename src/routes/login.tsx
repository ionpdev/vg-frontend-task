import type { ChangeEvent, FC, FormEvent } from "react"
import { useState } from "react"
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"
import { LoginView } from "../components/LoginView"
import { getUser, login } from "../libs/auth/auth"
import { useAuth } from "../libs/auth/useAuth"

const LoginPage: FC = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
    setError(null)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setError(null)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextUser = login(username, password)

    if (!nextUser) {
      setError("Username and password must match.")
      return
    }

    setUser(nextUser)
    void navigate({ to: "/dashboard" })
  }

  return (
    <LoginView
      username={username}
      password={password}
      errorMessage={error ?? undefined}
      onUsernameChange={handleUsernameChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
    />
  )
}

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    if (getUser()) {
      throw redirect({ to: "/dashboard" })
    }
  },
  component: LoginPage,
})
