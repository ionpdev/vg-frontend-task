import type { FC } from 'react'
import type { AllocationRow } from '../domain/models'
import { DonutChart } from './ui/DonutChart'
import { Card } from './ui/Card'
import { SegmentedControl } from './ui/SegmentedControl'
import { MODE_OPTIONS } from '../constants'

export interface DashboardDonutCardProps {
  allocations: AllocationRow[]
  mode: 'asset' | 'assetClass'
  selectedKey?: string
  onModeChange: (mode: 'asset' | 'assetClass') => void
  onSelect: (key: string) => void
  isLoading: boolean
}

export const DashboardDonutCard: FC<DashboardDonutCardProps> = ({
  allocations,
  mode,
  selectedKey,
  onModeChange,
  onSelect,
  isLoading,
}) => {
  const handleModeChange = (value: string) => {
    if (value === 'asset' || value === 'assetClass') {
      onModeChange(value)
    }
  }

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = event.currentTarget.dataset.key

    if (key) {
      onSelect(key)
    }
  }

  return (
    <Card
      title="Portfolio Balance"
      actions={<SegmentedControl value={mode} options={MODE_OPTIONS} onChange={handleModeChange} />}
    >
      <div className="space-y-4">
        {isLoading ? (
          <div className="h-48 rounded-xl border border-dashed border-[rgb(var(--border))] bg-[rgba(var(--fg),0.04)]" />
        ) : allocations.length === 0 ? (
          <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-[rgb(var(--border))] text-sm text-[rgb(var(--fg))]/60">
            No allocation data.
          </div>
        ) : (
          <DonutChart data={allocations} selectedKey={selectedKey} onSelect={onSelect} />
        )}
        <div className="grid gap-3">
          {allocations.map((row) => {
            const isActive = row.key === selectedKey

            return (
              <button
                key={row.key}
                className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
                  isActive
                    ? 'border-[rgb(var(--primary))] bg-[rgba(var(--primary),0.08)] text-[rgb(var(--primary))]'
                    : 'border-[rgb(var(--border))] text-[rgb(var(--fg))]/70 hover:bg-[rgba(var(--fg),0.04)]'
                }`}
                data-key={row.key}
                onClick={handleSelect}
                type="button"
              >
                <span className="font-medium">{row.label}</span>
                <span>{row.percent.toFixed(1)}%</span>
              </button>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
