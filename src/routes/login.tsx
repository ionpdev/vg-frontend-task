import type { ChangeEvent, FC, FormEvent } from "react"
import { useState } from "react"
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router"
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
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-sm text-slate-500">
          Use the same value for username and password.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-2 text-sm">
          <span className="text-slate-500">Username</span>
          <input
            className="w-full rounded-md border border-[rgb(var(--border))] bg-transparent px-3 py-2 text-sm"
            onChange={handleUsernameChange}
            placeholder="demo"
            type="text"
            value={username}
          />
        </label>
        <label className="block space-y-2 text-sm">
          <span className="text-slate-500">Password</span>
          <input
            className="w-full rounded-md border border-[rgb(var(--border))] bg-transparent px-3 py-2 text-sm"
            onChange={handlePasswordChange}
            placeholder="demo"
            type="password"
            value={password}
          />
        </label>

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

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
