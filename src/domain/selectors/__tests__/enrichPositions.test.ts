import { describe, expect, it } from 'vitest'
import { enrichPositions } from '../enrichPositions'
import type { AssetModel, PositionModel, PriceModel } from '../../models'

const assets: AssetModel[] = [
  { id: 'asset-btc', name: 'BTC', type: 'crypto' },
  { id: 'asset-aapl', name: 'AAPL', type: 'stock' },
]

const prices: PriceModel[] = [
  { id: 'price-btc', asset: 'BTC', price: 30000, asOf: '2023-01-01' },
  { id: 'price-aapl', asset: 'AAPL', price: 200, asOf: '2023-01-01' },
]

const positions: PositionModel[] = [
  { id: 1, asset: 'asset-btc', quantity: 0.5, asOf: '2023-01-01' },
  { id: 2, asset: 'asset-aapl', quantity: 10, asOf: '2023-01-01' },
]

describe('enrichPositions', () => {
  it('joins asset metadata and prices', () => {
    const result = enrichPositions({ positions, assets, prices })

    expect(result).toHaveLength(2)
    expect(result[0]).toMatchObject({
      assetName: 'BTC',
      assetType: 'crypto',
      price: 30000,
      value: 15000,
    })
    expect(result[1]).toMatchObject({
      assetName: 'AAPL',
      assetType: 'stock',
      price: 200,
      value: 2000,
    })
  })

  it('skips positions without assets or prices', () => {
    const result = enrichPositions({
      positions: [
        { id: 1, asset: 'asset-missing', quantity: 1, asOf: '2023-01-01' },
      ],
      assets,
      prices,
    })

    expect(result).toEqual([])
  })
})
