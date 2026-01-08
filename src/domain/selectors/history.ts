import type { HistoryPoint, PriceModel } from "../models"

export type HistoryFillMode = "none" | "carry"

export interface HistorySeriesParams {
  prices: PriceModel[]
  quantitiesByAsset: Record<string, number>
  fillMode?: HistoryFillMode
}

// Builds portfolio history series from daily prices and holdings.
export const historySeries = ({
  prices,
  quantitiesByAsset,
  fillMode = "carry",
}: HistorySeriesParams): HistoryPoint[] => {
  const grouped = new Map<string, PriceModel[]>()
  const assets = Object.keys(quantitiesByAsset)

  prices.forEach((price) => {
    const existing = grouped.get(price.asOf)
    if (existing) {
      existing.push(price)
    } else {
      grouped.set(price.asOf, [price])
    }
  })

  const dates = Array.from(grouped.keys()).sort((a, b) => a.localeCompare(b))
  const lastPrices = new Map<string, number>()

  return dates.map((date) => {
    const dayPrices = grouped.get(date) ?? []
    const priceByAsset = new Map(
      dayPrices.map((price) => [price.asset, price.price])
    )

    const value = assets.reduce((total, asset) => {
      const quantity = quantitiesByAsset[asset] ?? 0
      const directPrice = priceByAsset.get(asset)

      if (directPrice !== undefined) {
        lastPrices.set(asset, directPrice)
        return total + directPrice * quantity
      }

      if (fillMode === "carry") {
        const carried = lastPrices.get(asset)
        return carried !== undefined ? total + carried * quantity : total
      }

      return total
    }, 0)

    return { date, value }
  })
}
