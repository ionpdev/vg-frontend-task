import type { FC } from 'react'
import type { HistoryPoint, HistoryRange } from '../domain/models'
import { Card } from './ui/Card'
import { LineChart } from './ui/LineChart'
import { SegmentedControl } from './ui/SegmentedControl'
import { RANGE_OPTIONS } from '../constants'

export interface DashboardHistoryCardProps {
  range: HistoryRange
  onRangeChange: (range: HistoryRange) => void
  points: HistoryPoint[]
  isLoading: boolean
  filterLabel: string
}

export const DashboardHistoryCard: FC<DashboardHistoryCardProps> = ({
  range,
  onRangeChange,
  points,
  isLoading,
  filterLabel,
}) => {
  const handleRangeChange = (value: string) => {
    if (value === '1M' || value === '3M' || value === '6M' || value === '1Y' || value === 'ALL') {
      onRangeChange(value)
    }
  }

  return (
    <Card
      title="Historical Performance"
      actions={
        <SegmentedControl
          value={range}
          options={RANGE_OPTIONS}
          onChange={handleRangeChange}
        />
      }
    >
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[rgb(var(--fg))]/50">
        {filterLabel}
      </p>
      {isLoading ? (
        <div className="h-56">
          <div className="h-full w-full rounded-xl border border-dashed border-[rgb(var(--border))] bg-[rgba(var(--fg),0.04)]" />
        </div>
      ) : points.length === 0 ? (
        <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-[rgb(var(--border))] text-sm text-[rgb(var(--fg))]/60">
          No history available.
        </div>
      ) : (
        <LineChart data={points} />
      )}
    </Card>
  )
}
