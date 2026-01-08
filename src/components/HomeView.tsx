import type { FC } from "react"
import { PageHeader, HeaderActionButton, HeaderActionLink } from "./ui"

export interface HomeViewProps {
  isAuthenticated: boolean
  onLogout: () => void
}

export const HomeView: FC<HomeViewProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <div className="space-y-10">
      <header className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-8 py-10 shadow-sm">
        <PageHeader
          badge="Vega Portfolio"
          title="Portfolio Overview"
          subtitle="Track allocations, positions, and historical performance in a clean, responsive dashboard."
          actions={
            isAuthenticated ? (
              <>
                <HeaderActionLink to="/dashboard" variant="primary">
                  View Dashboard
                </HeaderActionLink>
                <HeaderActionButton onClick={onLogout}>
                  Logout
                </HeaderActionButton>
              </>
            ) : (
              <HeaderActionLink to="/login" variant="primary">
                Login
              </HeaderActionLink>
            )
          }
        />
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          "Donut breakdown by asset and asset class.",
          "Positions table aligned with the selected slice.",
          "Historical chart with time-range controls.",
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
