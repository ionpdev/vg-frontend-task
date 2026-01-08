import type { FC } from "react"
import { createFileRoute } from "@tanstack/react-router"

const DashboardPage: FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-sm text-slate-500">Widgets and Graphs.</p>
    </div>
  )
}

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
})
