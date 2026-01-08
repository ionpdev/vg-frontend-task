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

describe("login flow", () => {
  it("logs in and redirects to dashboard", async () => {
    const { screen, fireEvent } = await import("@testing-library/react")
    await renderWithRouter("/login")

    const usernameInput = await screen.findByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)

    fireEvent.change(usernameInput, { target: { value: "demo" } })
    fireEvent.change(passwordInput, { target: { value: "demo" } })

    const submitButton = screen.getByRole("button", { name: /continue/i })
    fireEvent.click(submitButton)

    expect(
      await screen.findByText(/dashboard/i, {}, { timeout: 3000 })
    ).toBeInTheDocument()
  })
})
