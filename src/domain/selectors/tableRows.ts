import type { AllocationRow, EnrichedPosition } from '../models'
import { allocationsByAsset, allocationsByAssetClass } from './allocations'

export interface AssetTableRow {
  key: string
  label: string
  quantity: number
  price: number
  value: number
  percent: number
}

export interface AssetClassTableRow {
  key: string
  label: string
  value: number
  percent: number
}

const sumValues = (rows: { value: number }[]) => {
  return rows.reduce((total, row) => total + row.value, 0)
}

export const buildAssetRows = (positions: EnrichedPosition[]): AssetTableRow[] => {
  const grouped = new Map<string, AssetTableRow>()

  positions.forEach((position) => {
    const existing = grouped.get(position.assetName)

    if (existing) {
      const nextQuantity = existing.quantity + position.quantity
      const nextValue = existing.value + position.value
      const avgPrice = nextQuantity === 0 ? 0 : nextValue / nextQuantity

      grouped.set(position.assetName, {
        ...existing,
        quantity: nextQuantity,
        value: nextValue,
        price: avgPrice,
      })
    } else {
      grouped.set(position.assetName, {
        key: position.assetName,
        label: position.assetName,
        quantity: position.quantity,
        price: position.price,
        value: position.value,
        percent: 0,
      })
    }
  })

  const rows = Array.from(grouped.values())
  const total = sumValues(rows)

  return rows.map((row) => ({
    ...row,
    percent: total === 0 ? 0 : (row.value / total) * 100,
  }))
}

export const buildAssetClassRows = (
  positions: EnrichedPosition[],
): AssetClassTableRow[] => {
  const allocations = allocationsByAssetClass(positions)

  return allocations.map((row) => ({
    key: row.key,
    label: row.label,
    value: row.value,
    percent: row.percent,
  }))
}

export const buildAllocationRows = (
  positions: EnrichedPosition[],
  mode: 'asset' | 'assetClass',
): AllocationRow[] => {
  return mode === 'asset'
    ? allocationsByAsset(positions)
    : allocationsByAssetClass(positions)
}
