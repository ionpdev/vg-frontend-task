import type { FC } from "react"
import { Skeleton } from "./Skeleton"

export interface SummaryStatsProps {
  assetsCount: number
  positionsCount: number
  pricesCount: number
  isPricesLoading: boolean
}

export const SummaryStats: FC<SummaryStatsProps> = ({
  assetsCount,
  positionsCount,
  pricesCount,
  isPricesLoading,
}) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3 text-sm text-[rgb(var(--fg))]/60 transition hover:shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--fg))]/50">
          Assets
        </p>
        <p className="text-lg font-semibold text-[rgb(var(--fg))]">
          {assetsCount}
        </p>
      </div>
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3 text-sm text-[rgb(var(--fg))]/60 transition hover:shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--fg))]/50">
          Positions
        </p>
        <p className="text-lg font-semibold text-[rgb(var(--fg))]">
          {positionsCount}
        </p>
      </div>
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3 text-sm text-[rgb(var(--fg))]/60 transition hover:shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--fg))]/50">
          Prices
        </p>
        <p className="text-lg font-semibold text-[rgb(var(--fg))]">
          {pricesCount}
        </p>
        {isPricesLoading ? <Skeleton className="mt-2 h-3 w-24" /> : null}
      </div>
    </div>
  )
}
