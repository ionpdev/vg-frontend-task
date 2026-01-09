import type { FC } from "react"
import { PageHeader, PillList, SummaryCards } from "./ui"

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
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
        />
        <PillList
          labels={[
            "Live market pulse",
            "Allocation insights",
            "Historical context",
          ]}
        />
      </header>
      <SummaryCards />
    </div>
  )
}
