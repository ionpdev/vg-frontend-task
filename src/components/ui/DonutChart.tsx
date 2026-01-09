import type { FC } from "react"
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts"
import type { AllocationRow } from "../../domain/models"
import { Tooltip } from "./Tooltip"
import { DONUT_COLORS } from "../../constants"

export interface DonutChartProps {
  data: AllocationRow[]
  selectedKey?: string
  onSelect: (key: string) => void
}

export const DonutChart: FC<DonutChartProps> = ({
  data,
  selectedKey,
  onSelect,
}) => {
  const renderTooltip = ({
    active,
    payload,
  }: {
    active?: boolean
    payload?: ReadonlyArray<{ payload?: AllocationRow }>
  }) => {
    if (!active || !payload || payload.length === 0) {
      return null
    }

    const row = payload[0]?.payload

    if (!row) {
      return null
    }

    return <Tooltip title={row.label} value={`${row.percent.toFixed(1)}%`} />
  }

  const chartData: Array<Record<string, unknown>> = data.map((row) => ({
    ...row,
  }))

  const handleSliceClick = (payload: unknown) => {
    if (!payload || typeof payload !== "object") {
      return
    }

    const row = (payload as { key?: string }).key

    if (row) {
      onSelect(row)
    }
  }

  return (
    <div className="donut-chart h-48">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="label"
            innerRadius={55}
            outerRadius={80}
            onClick={handleSliceClick}
          >
            {data.map((row, index) => (
              <Cell
                key={row.key}
                fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                opacity={selectedKey && row.key !== selectedKey ? 0.5 : 1}
              />
            ))}
          </Pie>
          <RechartsTooltip content={renderTooltip} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
