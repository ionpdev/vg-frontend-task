import type { FC } from "react"
import type { AllocationRow, HistoryPoint, HistoryRange } from "../domain/models"
import type {
  AssetClassTableRow,
  AssetTableRow,
} from "../domain/selectors/tableRows"
import {
  HeaderActionButton,
  HeaderActionLink,
  PageHeader,
  Skeleton,
  StatusMessage,
} from "./ui"
import { DashboardDonutCard } from "./DashboardDonutCard"
import { DashboardHistoryCard } from "./DashboardHistoryCard"
import { DashboardTableCard } from "./DashboardTableCard"

export interface DashboardViewProps {
  badge: string
  title: string
  assetsCount: number
  positionsCount: number
  pricesCount: number
  isLoading: boolean
  hasError: boolean
  errorMessage: string
  isPricesLoading: boolean
  onLogout: () => void
  mode: "asset" | "assetClass"
  allocations: AllocationRow[]
  selectedKey?: string
  onModeChange: (mode: "asset" | "assetClass") => void
  onSelect: (key: string) => void
  tableRows: Array<AssetTableRow | AssetClassTableRow>
  range: HistoryRange
  onRangeChange: (range: HistoryRange) => void
  historyPoints: HistoryPoint[]
  historyLoading: boolean
  historyFilterLabel: string
}

export const DashboardView: FC<DashboardViewProps> = ({
  badge,
  title,
  assetsCount,
  positionsCount,
  pricesCount,
  isLoading,
  hasError,
  errorMessage,
  isPricesLoading,
  onLogout,
  mode,
  allocations,
  selectedKey,
  onModeChange,
  onSelect,
  tableRows,
  range,
  onRangeChange,
  historyPoints,
  historyLoading,
  historyFilterLabel,
}) => {
  return (
    <div className="space-y-6">
      <PageHeader
        badge={badge}
        title={title}
        actions={
          <>
            <HeaderActionLink to="/">Back home</HeaderActionLink>
            <HeaderActionButton onClick={onLogout}>Logout</HeaderActionButton>
          </>
        }
      />
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : null}
      {hasError ? <StatusMessage message={errorMessage} tone="error" /> : null}
      {!isLoading && !hasError ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3 text-sm text-slate-500">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Assets
              </p>
              <p className="text-lg font-semibold text-[rgb(var(--fg))]">
                {assetsCount}
              </p>
            </div>
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3 text-sm text-slate-500">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Positions
              </p>
              <p className="text-lg font-semibold text-[rgb(var(--fg))]">
                {positionsCount}
              </p>
            </div>
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3 text-sm text-slate-500">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Prices
              </p>
              <p className="text-lg font-semibold text-[rgb(var(--fg))]">
                {pricesCount}
              </p>
              {isPricesLoading ? <Skeleton className="mt-2 h-3 w-24" /> : null}
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1.6fr]">
            <DashboardDonutCard
              allocations={allocations}
              mode={mode}
              selectedKey={selectedKey}
              onModeChange={onModeChange}
              onSelect={onSelect}
              isLoading={isPricesLoading}
            />
            <DashboardTableCard
              rows={tableRows}
              mode={mode}
              selectedKey={selectedKey}
              onSelect={onSelect}
            />
          </div>
          <DashboardHistoryCard
            range={range}
            onRangeChange={onRangeChange}
            points={historyPoints}
            isLoading={historyLoading}
            filterLabel={historyFilterLabel}
          />
        </div>
      ) : null}
    </div>
  )
}
