import { createRouter } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { queryClient } from './libs/queryClient'

export interface RouterContext {
  queryClient: QueryClient
}

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    } satisfies RouterContext,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

  return router
}
