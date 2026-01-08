import type { FC } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { HistoryPoint } from '../../domain/models'
import { formatUsd } from '../../domain/money'
import { formatChartDate } from '../../utils'
import { Tooltip } from './Tooltip'

export interface LineChartProps {
  data: HistoryPoint[]
}

const renderLineTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: ReadonlyArray<{ payload?: HistoryPoint }>
}) => {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const point = payload[0]?.payload

  if (!point) {
    return null
  }

  return <Tooltip title={point.date} value={formatUsd(point.value)} />
}

export const LineChart: FC<LineChartProps> = ({ data }) => {

  return (
    <div className="h-60">
      <ResponsiveContainer>
        <RechartsLineChart data={data} margin={{ top: 10, left: 6, right: 12, bottom: 0 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 6" />
          <XAxis
            dataKey="date"
            tickFormatter={formatChartDate}
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={32}
            tickMargin={8}
          />
          <YAxis
            tickFormatter={formatUsd}
            stroke="#94a3b8"
            width={86}
            tickLine={false}
            axisLine={false}
          />
          <RechartsTooltip content={renderLineTooltip} />
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
