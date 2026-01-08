import type { AssetModel, EnrichedPosition, PositionModel, PriceModel } from '../models'

export interface EnrichPositionsParams {
  positions: PositionModel[]
  assets: AssetModel[]
  prices: PriceModel[]
}

const buildPriceMap = (prices: PriceModel[]) => {
  return new Map(prices.map((price) => [price.asset, price.price]))
}

const buildAssetMap = (assets: AssetModel[]) => {
  return new Map(assets.map((asset) => [asset.id, asset]))
}

export const enrichPositions = ({
  positions,
  assets,
  prices,
}: EnrichPositionsParams): EnrichedPosition[] => {
  const priceMap = buildPriceMap(prices)
  const assetMap = buildAssetMap(assets)

  return positions
    .map((position) => {
      const asset = assetMap.get(position.asset)

      if (!asset) {
        return null
      }

      const price =
        position.price ?? priceMap.get(asset.name) ?? priceMap.get(asset.id)

      if (price === undefined) {
        return null
      }

      return {
        id: position.id,
        assetId: asset.id,
        assetName: asset.name,
        assetType: asset.type,
        quantity: position.quantity,
        price,
        value: price * position.quantity,
      }
    })
    .filter((position): position is EnrichedPosition => Boolean(position))
}
