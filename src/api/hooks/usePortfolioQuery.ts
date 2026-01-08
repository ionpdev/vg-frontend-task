import { useQuery } from '@tanstack/react-query'
import { getPortfolio } from '../endpoints/portfolios'
import { queryKeys } from '../queryKeys'

export interface UsePortfolioQueryParams {
  asOf?: string
}

export const usePortfolioQuery = ({ asOf }: UsePortfolioQueryParams = {}) => {
  return useQuery({
    queryKey: queryKeys.portfolio(asOf),
    queryFn: () => getPortfolio({ asOf }),
  })
}
