import { z } from 'zod'

export const AssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['stock', 'crypto', 'fiat', 'cash']),
})

export const AssetsSchema = z.array(AssetSchema)

export type Asset = z.infer<typeof AssetSchema>
