import { useQuery } from '@tanstack/react-query'
import type { GetPricesParams } from '../endpoints/prices'
import { getPrices } from '../endpoints/prices'
import { queryKeys } from '../queryKeys'

export const usePricesQuery = (params: GetPricesParams) => {
  return useQuery({
    queryKey: queryKeys.prices(params),
    queryFn: () => getPrices(params),
    enabled: params.assets.length > 0,
  })
}
