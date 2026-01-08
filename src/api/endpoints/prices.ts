import { api } from '../index'
import { PricesSchema } from '../schemas/price'

export interface GetPricesParams {
  assets: string[]
  asOf?: string
  from?: string
  to?: string
}

export const getPrices = ({ assets, asOf, from, to }: GetPricesParams) => {
  const url = new URL('/prices', window.location.origin)

  if (assets.length === 1) {
    url.searchParams.set('asset', assets[0])
  } else if (assets.length > 1) {
    url.searchParams.set('assets', assets.join(','))
  }

  if (asOf) {
    url.searchParams.set('asOf', asOf)
  }

  if (from) {
    url.searchParams.set('from', from)
  }

  if (to) {
    url.searchParams.set('to', to)
  }

  return api.get(url.toString(), PricesSchema)
}
