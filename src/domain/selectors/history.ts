import type { HistoryPoint, PriceModel } from '../models'

export interface HistorySeriesParams {
  prices: PriceModel[]
  quantitiesByAsset: Record<string, number>
}

export const historySeries = ({
  prices,
  quantitiesByAsset,
}: HistorySeriesParams): HistoryPoint[] => {
  const grouped = new Map<string, PriceModel[]>()

  prices.forEach((price) => {
    const existing = grouped.get(price.asOf)
    if (existing) {
      existing.push(price)
    } else {
      grouped.set(price.asOf, [price])
    }
  })

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, dayPrices]) => {
      const value = dayPrices.reduce((total, price) => {
        const quantity = quantitiesByAsset[price.asset] ?? 0
        return total + price.price * quantity
      }, 0)

      return { date, value }
    })
}
