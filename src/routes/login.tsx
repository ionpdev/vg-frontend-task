import type { FC } from "react"
import { createFileRoute } from "@tanstack/react-router"

const LoginPage: FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="text-sm text-slate-500">LocalStorage auth.</p>
    </div>
  )
}

export const Route = createFileRoute("/login")({
  component: LoginPage,
})
