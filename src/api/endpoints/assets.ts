import { api } from '../index'
import { AssetsSchema } from '../schemas/asset'

export const getAssets = () => {
  return api.get('/assets', AssetsSchema)
}
