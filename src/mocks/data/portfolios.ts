export interface PositionFixture {
  id: number
  asset: string
  quantity: number
  asOf: string
}

export interface PortfolioFixture {
  id: string
  asOf: string
  positions: PositionFixture[]
}

export const portfolio: PortfolioFixture = {
  id: 'portfolio-1',
  asOf: '2023-01-01T00:00:00Z',
  positions: [
    { id: 1, asset: 'asset-btc', quantity: 0.45, asOf: '2023-01-01T00:00:00Z' },
    { id: 2, asset: 'asset-eth', quantity: 8.2, asOf: '2023-01-01T00:00:00Z' },
    { id: 3, asset: 'asset-aapl', quantity: 32, asOf: '2023-01-01T00:00:00Z' },
    { id: 4, asset: 'asset-msft', quantity: 18, asOf: '2023-01-01T00:00:00Z' },
    { id: 5, asset: 'asset-usd', quantity: 12500, asOf: '2023-01-01T00:00:00Z' },
  ],
}
