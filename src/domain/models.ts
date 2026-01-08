export interface AssetModel {
  id: string
  name: string
  type: 'stock' | 'crypto' | 'fiat' | 'cash'
}

export interface PriceModel {
  id: string
  asset: string
  price: number
  asOf: string
}

export interface PositionModel {
  id: number
  asset: string
  quantity: number
  asOf: string
  price?: number
}

export interface PortfolioModel {
  id: string
  asOf: string
  positions: PositionModel[]
}

export interface EnrichedPosition {
  id: number
  assetId: string
  assetName: string
  assetType: AssetModel['type']
  quantity: number
  price: number
  value: number
}

export interface AllocationRow {
  key: string
  label: string
  value: number
  percent: number
}

export interface HistoryPoint {
  date: string
  value: number
}

export type HistoryRange = "1M" | "3M" | "6M" | "1Y" | "ALL"
