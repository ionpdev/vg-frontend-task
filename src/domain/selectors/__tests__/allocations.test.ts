import { describe, expect, it } from 'bun:test'
import { allocationsByAsset, allocationsByAssetClass } from '../allocations'
import type { EnrichedPosition } from '../../models'

const positions: EnrichedPosition[] = [
  {
    id: 1,
    assetId: 'asset-btc',
    assetName: 'BTC',
    assetType: 'crypto',
    quantity: 0.5,
    price: 30000,
    value: 15000,
  },
  {
    id: 2,
    assetId: 'asset-eth',
    assetName: 'ETH',
    assetType: 'crypto',
    quantity: 5,
    price: 2000,
    value: 10000,
  },
  {
    id: 3,
    assetId: 'asset-aapl',
    assetName: 'AAPL',
    assetType: 'stock',
    quantity: 10,
    price: 200,
    value: 2000,
  },
]

describe('allocations', () => {
  it('groups by asset', () => {
    const result = allocationsByAsset(positions)

    expect(result).toHaveLength(3)
    const btc = result.find((row) => row.key === 'BTC')
    expect(btc?.value).toBe(15000)
  })

  it('groups by asset class', () => {
    const result = allocationsByAssetClass(positions)

    expect(result).toHaveLength(2)
    const crypto = result.find((row) => row.key === 'crypto')
    expect(crypto?.value).toBe(25000)
  })
})
