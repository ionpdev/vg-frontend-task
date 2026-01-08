import type { FC } from "react"
import { useMemo } from "react"
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"
import { getApiErrorMessage } from "../api"
import { useAssetsQuery } from "../api/hooks/useAssetsQuery"
import { usePortfolioQuery } from "../api/hooks/usePortfolioQuery"
import { usePricesQuery } from "../api/hooks/usePricesQuery"
import { DashboardView } from "../components/DashboardView"
import { isAuthed, logout } from "../libs/auth/auth"
import { useAuth } from "../libs/auth/useAuth"

const DashboardPage: FC = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const {
    data: assets,
    isLoading: assetsLoading,
    error: assetsError,
  } = useAssetsQuery()
  const {
    data: portfolio,
    isLoading: portfolioLoading,
    error: portfolioError,
  } = usePortfolioQuery()

  const priceAssets = useMemo(() => {
    if (!assets || !portfolio) {
      return []
    }

    const assetById = new Map(assets.map((asset) => [asset.id, asset.name]))

    return portfolio.positions
      .map((position) => assetById.get(position.asset))
      .filter((assetName): assetName is string => Boolean(assetName))
  }, [assets, portfolio])

  const {
    data: prices,
    error: pricesError,
    isLoading: pricesLoading,
  } = usePricesQuery({ assets: priceAssets })

  const handleLogout = () => {
    logout()
    setUser(null)
    void navigate({ to: "/" })
  }

  return (
    <DashboardView
      badge="Vega Portfolio"
      title="Dashboard"
      onLogout={handleLogout}
      assetsCount={assets?.length ?? 0}
      positionsCount={portfolio?.positions.length ?? 0}
      pricesCount={prices?.length ?? 0}
      isLoading={assetsLoading || portfolioLoading}
      hasError={Boolean(assetsError || portfolioError || pricesError)}
      errorMessage={getApiErrorMessage(
        assetsError ?? portfolioError ?? pricesError,
      )}
      isPricesLoading={pricesLoading}
    />
  )
}

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    if (!isAuthed()) {
      throw redirect({ to: "/login" })
    }
  },
  component: DashboardPage,
})
