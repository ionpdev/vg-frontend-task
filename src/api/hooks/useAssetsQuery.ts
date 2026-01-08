import { useQuery } from '@tanstack/react-query'
import { getAssets } from '../endpoints/assets'
import { queryKeys } from '../queryKeys'

export const useAssetsQuery = () => {
  return useQuery({
    queryKey: queryKeys.assets,
    queryFn: getAssets,
  })
}
