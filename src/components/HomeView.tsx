import type { FC } from "react"
import { PageHeader, HeaderActionButton, HeaderActionLink } from "./ui"

export interface HomeViewProps {
  isAuthenticated: boolean
  onLogout: () => void
}

export const HomeView: FC<HomeViewProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <div className="relative space-y-8 overflow-hidden sm:space-y-10">
      <div className="pointer-events-none absolute -left-28 top-[-120px] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(var(--primary),0.2),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute -right-32 top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(var(--primary),0.16),transparent_65%)] blur-2xl" />
      <header className="relative rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-8 shadow-sm sm:px-8 sm:py-10">
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
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "Live market pulse",
            "Allocation insights",
            "Historical context",
          ].map((label) => (
            <span
              key={label}
              className="rounded-full border border-[rgb(var(--border))] bg-[rgba(var(--fg),0.03)] px-3 py-1 text-xs font-semibold text-[rgb(var(--fg))]/70"
            >
              {label}
            </span>
          ))}
        </div>
      </header>

      <section className="grid gap-5 md:grid-cols-3">
        {[
          "Donut breakdown by asset and asset class.",
          "Positions table aligned with the selected slice.",
          "Historical chart with time-range controls.",
        ].map((text) => (
          <div
            key={text}
            className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-5 text-sm text-[rgb(var(--fg))]/70 transition hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[rgb(var(--primary))]" />
              <p>{text}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
