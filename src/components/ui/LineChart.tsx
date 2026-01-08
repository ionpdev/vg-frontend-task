import type { FC } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { HistoryPoint } from '../../domain/models'
import { formatUsd } from '../../domain/money'

export interface LineChartProps {
  data: HistoryPoint[]
}

const formatDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)

  if (!year || !month || !day) {
    return value
  }

  const date = new Date(Date.UTC(year, month - 1, day))

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const formatValue = (value: number) => {
  return formatUsd(value)
}

const LineTooltip: FC<{ active?: boolean; payload?: Array<{ payload?: HistoryPoint }> }> = ({
  active,
  payload,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const point = payload[0]?.payload

  if (!point) {
    return null
  }

  return (
    <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-2 text-xs shadow-sm">
      <p className="font-semibold text-slate-700">{point.date}</p>
      <p className="text-slate-500">{formatUsd(point.value)}</p>
    </div>
  )
}

export const LineChart: FC<LineChartProps> = ({ data }) => {
  return (
    <div className="h-60">
      <ResponsiveContainer>
        <RechartsLineChart data={data} margin={{ top: 10, left: 6, right: 12, bottom: 0 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 6" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={32}
            tickMargin={8}
          />
          <YAxis
            tickFormatter={formatValue}
            stroke="#94a3b8"
            width={86}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<LineTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}
