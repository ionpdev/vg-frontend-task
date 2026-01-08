import type { FC } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Layout } from '../components/layout'

const RootLayout: FC = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

const NotFoundPage: FC = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <Link className="text-sm text-[rgb(var(--primary))]" to="/">
          Return home
        </Link>
      </div>
    </Layout>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})
