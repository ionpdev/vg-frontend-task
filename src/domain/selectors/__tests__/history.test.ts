import { describe, expect, it } from 'vitest'
import { historySeries } from '../history'
import type { PriceModel } from '../../models'

const prices: PriceModel[] = [
  { id: 'price-1', asset: 'BTC', price: 30000, asOf: '2023-01-01' },
  { id: 'price-2', asset: 'ETH', price: 2000, asOf: '2023-01-01' },
  { id: 'price-3', asset: 'BTC', price: 32000, asOf: '2023-01-02' },
  { id: 'price-4', asset: 'ETH', price: 2100, asOf: '2023-01-02' },
]

describe('historySeries', () => {
  it('aggregates portfolio value per day', () => {
    const result = historySeries({
      prices,
      quantitiesByAsset: {
        BTC: 1,
        ETH: 2,
      },
    })

    expect(result).toEqual([
      { date: '2023-01-01', value: 34000 },
      { date: '2023-01-02', value: 36200 },
    ])
  })

  it('carries forward prices when missing', () => {
    const result = historySeries({
      prices: [
        { id: 'price-1', asset: 'BTC', price: 30000, asOf: '2023-01-01' },
        { id: 'price-2', asset: 'ETH', price: 2000, asOf: '2023-01-01' },
        { id: 'price-3', asset: 'BTC', price: 32000, asOf: '2023-01-02' },
      ],
      quantitiesByAsset: {
        BTC: 1,
        ETH: 2,
      },
    })

    expect(result).toEqual([
      { date: '2023-01-01', value: 34000 },
      { date: '2023-01-02', value: 36000 },
    ])
  })
})
