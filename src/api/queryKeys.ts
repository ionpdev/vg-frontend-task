import type { GetPricesParams } from './endpoints/prices'

export const queryKeys = {
  assets: ['assets'] as const,
  portfolio: (asOf?: string) => ['portfolio', { asOf }] as const,
  prices: (params: GetPricesParams) => ['prices', params] as const,
}
