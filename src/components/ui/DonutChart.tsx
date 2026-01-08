import type { FC } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { AllocationRow } from '../../domain/models'

export interface DonutChartProps {
  data: AllocationRow[]
  selectedKey?: string
  onSelect: (key: string) => void
}

const COLORS = [
  '#2563eb',
  '#0ea5e9',
  '#14b8a6',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
]

const getActiveIndex = (data: AllocationRow[], selectedKey?: string) => {
  if (!selectedKey) {
    return -1
  }

  return data.findIndex((row) => row.key === selectedKey)
}

const DonutTooltip: FC<{ active?: boolean; payload?: Array<{ payload?: AllocationRow }> }> = ({
  active,
  payload,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const row = payload[0]?.payload

  if (!row) {
    return null
  }

  return (
    <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-2 text-xs shadow-sm">
      <p className="font-semibold text-slate-700">{row.label}</p>
      <p className="text-slate-500">{row.percent.toFixed(1)}%</p>
    </div>
  )
}

export const DonutChart: FC<DonutChartProps> = ({ data, selectedKey, onSelect }) => {
  const handleSliceClick = (payload: unknown) => {
    if (!payload || typeof payload !== 'object') {
      return
    }

    const row = (payload as { key?: string }).key

    if (row) {
      onSelect(row)
    }
  }

  const activeIndex = getActiveIndex(data, selectedKey)

  return (
    <div className="h-48">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={55}
            outerRadius={80}
            activeIndex={activeIndex}
            activeOuterRadius={88}
            onClick={handleSliceClick}
          >
            {data.map((row, index) => (
              <Cell
                key={row.key}
                fill={COLORS[index % COLORS.length]}
                opacity={selectedKey && row.key !== selectedKey ? 0.5 : 1}
              />
            ))}
          </Pie>
          <Tooltip content={<DonutTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
