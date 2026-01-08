import "../../test/setup"
import { describe, expect, it } from "vitest"
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { routeTree } from "../../routeTree.gen"
import { AuthProvider } from "../../libs/auth/AuthProvider"
import { login } from "../../libs/auth/auth"

const renderWithRouter = async (initialPath: string) => {
  const { render } = await import("@testing-library/react")
  const testQueryClient = new QueryClient()
  const router = createRouter({
    routeTree,
    context: { queryClient: testQueryClient },
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  })

  render(
    <QueryClientProvider client={testQueryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

describe("dashboard", () => {
  it("renders dashboard widgets with mock data", async () => {
    const { screen } = await import("@testing-library/react")
    login("demo", "demo")
    await renderWithRouter("/dashboard")

    expect(await screen.findByText(/dashboard/i)).toBeInTheDocument()
    expect(
      await screen.findByRole("heading", { name: /portfolio balance/i })
    ).toBeInTheDocument()
    expect(
      await screen.findByRole("heading", { name: /positions/i })
    ).toBeInTheDocument()
    expect(
      await screen.findByRole("heading", { name: /historical performance/i })
    ).toBeInTheDocument()
  })
})
