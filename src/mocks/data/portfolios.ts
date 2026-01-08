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
  asOf: '2025-02-14T00:00:00Z',
  positions: [
    { id: 1, asset: 'asset-btc', quantity: 0.45, asOf: '2021-05-18T00:00:00Z' },
    { id: 2, asset: 'asset-eth', quantity: 8.2, asOf: '2022-11-03T00:00:00Z' },
    { id: 3, asset: 'asset-aapl', quantity: 18, asOf: '2019-07-12T00:00:00Z' },
    { id: 4, asset: 'asset-msft', quantity: 18, asOf: '2024-03-08T00:00:00Z' },
    { id: 5, asset: 'asset-amzn', quantity: 14, asOf: '2023-06-30T00:00:00Z' },
    { id: 6, asset: 'asset-usd', quantity: 12500, asOf: '2025-01-06T00:00:00Z' },
    { id: 7, asset: 'asset-eur', quantity: 5400, asOf: '2021-09-22T00:00:00Z' },
  ],
}
