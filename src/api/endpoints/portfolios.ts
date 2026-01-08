import { api } from '../index'
import { PortfolioSchema } from '../schemas/portfolio'

export interface GetPortfolioParams {
  asOf?: string
}

export const getPortfolio = ({ asOf }: GetPortfolioParams = {}) => {
  const url = new URL('/portfolios', window.location.origin)

  if (asOf) {
    url.searchParams.set('asOf', asOf)
  }

  return api.get(url.toString(), PortfolioSchema)
}
