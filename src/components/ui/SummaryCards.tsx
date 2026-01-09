import type { FC } from "react"

export const SummaryCards: FC = () => {
  return (
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
  )
}
