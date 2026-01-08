import type { AllocationRow, EnrichedPosition } from '../models'

// Sums allocation values to derive the portfolio total.
const sumValues = (rows: { value: number }[]) => {
  return rows.reduce((total, row) => total + row.value, 0)
}

// Converts a value into a portfolio percentage with zero-safe handling.
const toPercent = (value: number, total: number) => {
  if (total === 0) {
    return 0
  }

  return (value / total) * 100
}

// Groups positions by asset to power the donut/table views.
export const allocationsByAsset = (positions: EnrichedPosition[]): AllocationRow[] => {
  const grouped = new Map<string, { label: string; value: number }>()

  positions.forEach((position) => {
    const existing = grouped.get(position.assetName)

    if (existing) {
      existing.value += position.value
    } else {
      grouped.set(position.assetName, { label: position.assetName, value: position.value })
    }
  })

  const rows = Array.from(grouped.entries()).map(([key, item]) => ({
    key,
    label: item.label,
    value: item.value,
    percent: 0,
  }))

  const total = sumValues(rows)

  return rows.map((row) => ({
    ...row,
    percent: toPercent(row.value, total),
  }))
}

// Groups positions by asset class for the class-mode breakdown.
export const allocationsByAssetClass = (positions: EnrichedPosition[]): AllocationRow[] => {
  const grouped = new Map<string, { label: string; value: number }>()

  positions.forEach((position) => {
    const key = position.assetType
    const existing = grouped.get(key)

    if (existing) {
      existing.value += position.value
    } else {
      grouped.set(key, { label: position.assetType, value: position.value })
    }
  })

  const rows = Array.from(grouped.entries()).map(([key, item]) => ({
    key,
    label: item.label,
    value: item.value,
    percent: 0,
  }))

  const total = sumValues(rows)

  return rows.map((row) => ({
    ...row,
    percent: toPercent(row.value, total),
  }))
}
