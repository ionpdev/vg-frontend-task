import { z } from 'zod'

export const PositionSchema = z.object({
  id: z.number(),
  asset: z.string(),
  quantity: z.number(),
  asOf: z.string(),
  price: z.number().optional(),
})

export const PortfolioSchema = z.object({
  id: z.string(),
  asOf: z.string(),
  positions: z.array(PositionSchema),
})

export type Position = z.infer<typeof PositionSchema>
export type Portfolio = z.infer<typeof PortfolioSchema>
