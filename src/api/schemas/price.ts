import { z } from 'zod'

export const PriceSchema = z.object({
  id: z.string(),
  asset: z.string(),
  price: z.number(),
  asOf: z.string(),
})

export const PricesSchema = z.array(PriceSchema)

export type Price = z.infer<typeof PriceSchema>
