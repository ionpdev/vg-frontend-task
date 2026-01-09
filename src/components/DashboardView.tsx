import type { FC } from "react"
import type { DashboardViewModel } from "../hooks/useDashboardViewModel"
import {
  HeaderActionButton,
  HeaderActionLink,
  PageHeader,
  Skeleton,
  StatusMessage,
  SummaryStats,
} from "./ui"
import { DashboardDonutCard } from "./DashboardDonutCard"
import { DashboardHistoryCard } from "./DashboardHistoryCard"
import { DashboardTableCard } from "./DashboardTableCard"

export interface DashboardViewProps {
  badge: string
  title: string
  onLogout: () => void
  viewModel: DashboardViewModel
}

export const DashboardView: FC<DashboardViewProps> = ({
  badge,
  title,
  onLogout,
  viewModel,
}) => {
  const {
    assetsCount,
    positionsCount,
    pricesCount,
    isLoading,
    hasError,
    errorMessage,
    isPricesLoading,
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
  } = viewModel

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
          <SummaryStats
            assetsCount={assetsCount}
            positionsCount={positionsCount}
            pricesCount={pricesCount}
            isPricesLoading={isPricesLoading}
          />
          <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_1.6fr]">
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
