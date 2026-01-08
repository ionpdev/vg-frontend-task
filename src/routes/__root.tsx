import type { FC } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Layout } from '../components/Layout'
import { AuthProvider } from '../libs/auth/AuthProvider'

const RootLayout: FC = () => {
  const showDevtools = import.meta.env.DEV && !import.meta.env.VITEST

  return (
    <AuthProvider>
      <Layout>
        <Outlet />
        {showDevtools ? (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'TanStack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        ) : null}
      </Layout>
    </AuthProvider>
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
