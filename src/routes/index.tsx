import type { FC } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'

const HomePage: FC = () => {
  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-6 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-8 py-10 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Vega Portfolio
          </p>
          <h1 className="text-3xl font-semibold">Portfolio Overview</h1>
          <p className="max-w-xl text-sm text-slate-500">
            Track allocations, positions, and historical performance in a clean,
            responsive dashboard.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-md bg-[rgb(var(--primary))] px-5 py-2 text-sm font-semibold text-white"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="rounded-md border border-[rgb(var(--border))] px-5 py-2 text-sm font-semibold"
            to="/dashboard"
          >
            View Dashboard
          </Link>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          'Donut breakdown by asset and asset class.',
          'Positions table aligned with the selected slice.',
          'Historical chart with time-range controls.',
        ].map((text) => (
          <div
            key={text}
            className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4 text-sm text-slate-500"
          >
            {text}
          </div>
        ))}
      </section>

    </div>
  )
}

export const Route = createFileRoute('/')({
  component: HomePage,
})
