export interface AssetFixture {
  id: string
  name: string
  type: 'stock' | 'crypto' | 'fiat' | 'cash'
}

export const assets: AssetFixture[] = [
  { id: 'asset-btc', name: 'BTC', type: 'crypto' },
  { id: 'asset-eth', name: 'ETH', type: 'crypto' },
  { id: 'asset-aapl', name: 'AAPL', type: 'stock' },
  { id: 'asset-msft', name: 'MSFT', type: 'stock' },
  { id: 'asset-amzn', name: 'AMZN', type: 'stock' },
  { id: 'asset-usd', name: 'USD', type: 'fiat' },
  { id: 'asset-eur', name: 'EUR', type: 'fiat' },
]
