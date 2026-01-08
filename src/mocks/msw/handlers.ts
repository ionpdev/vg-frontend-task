import { http, HttpResponse } from 'msw'
import { assets } from '../data/assets'
import { portfolio } from '../data/portfolios'
import { generatePriceSeries, prices } from '../data/prices'

const parseAssetsParam = (url: URL): string[] => {
  const assetsParam = url.searchParams.get('assets')
  const assetParam = url.searchParams.get('asset')

  if (assetsParam) {
    return assetsParam
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
  }

  if (assetParam) {
    return [assetParam.trim()].filter(Boolean)
  }

  return []
}

export const handlers = [
  http.get('/health', () => {
    return HttpResponse.json({ ok: true })
  }),
  http.get('/assets', () => {
    return HttpResponse.json(assets)
  }),
  http.get('/portfolios', ({ request }) => {
    const url = new URL(request.url)
    const asOf = url.searchParams.get('asOf')

    if (!asOf) {
      return HttpResponse.json(portfolio)
    }

    return HttpResponse.json({ ...portfolio, asOf })
  }),
  http.get('/prices', ({ request }) => {
    const url = new URL(request.url)
    const requestedAssets = parseAssetsParam(url)
    const asOf = url.searchParams.get('asOf') ?? prices[0]?.asOf ?? ''
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')

    const assetsToUse =
      requestedAssets.length > 0
        ? requestedAssets
        : prices.map((price) => price.asset)

    if (from && to) {
      return HttpResponse.json(
        generatePriceSeries({
          assets: assetsToUse,
          from,
          to,
        }),
      )
    }

    const filtered = prices
      .filter((price) => assetsToUse.includes(price.asset))
      .map((price) => ({ ...price, asOf }))

    return HttpResponse.json(filtered)
  }),
]
