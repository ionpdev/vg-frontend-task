export interface PriceFixture {
  id: string
  asset: string
  price: number
  asOf: string
}

export const prices: PriceFixture[] = [
  { id: 'price-btc', asset: 'BTC', price: 30250.12, asOf: '2025-02-14' },
  { id: 'price-eth', asset: 'ETH', price: 2150.34, asOf: '2024-11-03' },
  { id: 'price-aapl', asset: 'AAPL', price: 178.45, asOf: '2023-07-12' },
  { id: 'price-msft', asset: 'MSFT', price: 247.18, asOf: '2024-03-08' },
  { id: 'price-amzn', asset: 'AMZN', price: 132.65, asOf: '2022-06-30' },
  { id: 'price-usd', asset: 'USD', price: 1, asOf: '2025-01-06' },
  { id: 'price-eur', asset: 'EUR', price: 1.09, asOf: '2021-09-22' },
]

export interface PriceSeriesParams {
  assets: string[]
  from: string
  to: string
}

const toDateOnly = (date: Date): string => {
  return date.toISOString().slice(0, 10)
}

const addDaysUtc = (date: Date, days: number): Date => {
  const next = new Date(date)
  next.setUTCDate(next.getUTCDate() + days)
  return next
}

const roundToCents = (value: number): number => {
  return Math.round(value * 100) / 100
}

const getBasePrice = (asset: string): number | null => {
  const match = prices.find((price) => price.asset === asset)
  return match ? match.price : null
}

export const generatePriceSeries = ({
  assets,
  from,
  to,
}: PriceSeriesParams): PriceFixture[] => {
  const fromDate = new Date(from)
  const toDate = new Date(to)

  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
    return []
  }

  if (fromDate > toDate) {
    return []
  }

  const series: PriceFixture[] = []

  assets.forEach((asset, assetIndex) => {
    const base = getBasePrice(asset)

    if (base === null) {
      return
    }

    let cursor = new Date(Date.UTC(fromDate.getUTCFullYear(), fromDate.getUTCMonth(), fromDate.getUTCDate()))
    let dayIndex = 0

    while (cursor <= toDate) {
      const swing = Math.sin(dayIndex / 3 + assetIndex)
      const drift = 1 + dayIndex * 0.0008
      const price = roundToCents(base * drift * (1 + swing * 0.02))

      series.push({
        id: `price-${asset.toLowerCase()}-${toDateOnly(cursor)}`,
        asset,
        price,
        asOf: toDateOnly(cursor),
      })

      cursor = addDaysUtc(cursor, 1)
      dayIndex += 1
    }
  })

  return series
}
