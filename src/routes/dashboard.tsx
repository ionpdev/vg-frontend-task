import type { FC } from "react"
import { useMemo, useState } from "react"
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"
import { getApiErrorMessage } from "../api"
import { useAssetsQuery } from "../api/hooks/useAssetsQuery"
import { usePortfolioQuery } from "../api/hooks/usePortfolioQuery"
import { usePricesQuery } from "../api/hooks/usePricesQuery"
import { DashboardView } from "../components/DashboardView"
import { getRangeDates } from "../domain/dateRange"
import { historySeries } from "../domain/selectors/history"
import { enrichPositions } from "../domain/selectors/enrichPositions"
import { buildAllocationRows, buildAssetClassRows, buildAssetRows } from "../domain/selectors/tableRows"
import { isAuthed, logout } from "../libs/auth/auth"
import { useAuth } from "../libs/auth/useAuth"

const DashboardPage: FC = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [mode, setMode] = useState<"asset" | "assetClass">("asset")
  const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined)
  const [range, setRange] = useState<"1M" | "3M" | "6M" | "1Y" | "ALL">("1M")
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

  const historyAssets = useMemo(() => {
    if (!assets || !portfolio) {
      return []
    }

    const assetById = new Map(assets.map((asset) => [asset.id, asset]))

    if (!selectedKey) {
      return priceAssets
    }

    if (mode === "asset") {
      return [selectedKey]
    }

    return portfolio.positions
      .map((position) => assetById.get(position.asset))
      .filter((asset): asset is NonNullable<typeof asset> => Boolean(asset))
      .filter((asset) => asset.type === selectedKey)
      .map((asset) => asset.name)
  }, [assets, portfolio, mode, selectedKey, priceAssets])

  const rangeDates = useMemo(() => getRangeDates(range), [range])
  const historyPricesQuery = usePricesQuery({
    assets: historyAssets,
    from: rangeDates.from,
    to: rangeDates.to,
  })

  const enrichedPositions = useMemo(() => {
    if (!assets || !portfolio || !prices) {
      return []
    }

    return enrichPositions({
      assets,
      positions: portfolio.positions,
      prices,
    })
  }, [assets, portfolio, prices])

  const allocations = useMemo(() => {
    return buildAllocationRows(enrichedPositions, mode)
  }, [enrichedPositions, mode])

  const tableRows = useMemo(() => {
    const rows = mode === "asset"
      ? buildAssetRows(enrichedPositions)
      : buildAssetClassRows(enrichedPositions)

    if (!selectedKey) {
      return rows
    }

    return rows.filter((row) => row.key === selectedKey)
  }, [enrichedPositions, mode, selectedKey])

  const quantitiesByAsset = useMemo(() => {
    return enrichedPositions.reduce<Record<string, number>>((acc, position) => {
      acc[position.assetName] = (acc[position.assetName] ?? 0) + position.quantity
      return acc
    }, {})
  }, [enrichedPositions])

  const historyPoints = useMemo(() => {
    const historyPrices = historyPricesQuery.data ?? []
    return historySeries({ prices: historyPrices, quantitiesByAsset, fillMode: "none" })
  }, [historyPricesQuery.data, quantitiesByAsset])

  const handleModeChange = (nextMode: "asset" | "assetClass") => {
    setMode(nextMode)
    setSelectedKey(undefined)
  }

  const handleSelect = (key: string) => {
    setSelectedKey((current) => (current === key ? undefined : key))
  }

  const handleRangeChange = (nextRange: "1M" | "3M" | "6M" | "1Y" | "ALL") => {
    setRange(nextRange)
  }

  const historyFilterLabel = useMemo(() => {
    if (!selectedKey) {
      return "All assets"
    }

    return mode === "asset" ? `Asset: ${selectedKey}` : `Class: ${selectedKey}`
  }, [mode, selectedKey])

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
      hasError={Boolean(assetsError || portfolioError || pricesError || historyPricesQuery.error)}
      errorMessage={getApiErrorMessage(
        assetsError ?? portfolioError ?? pricesError ?? historyPricesQuery.error,
      )}
      isPricesLoading={pricesLoading}
      mode={mode}
      allocations={allocations}
      selectedKey={selectedKey}
      onModeChange={handleModeChange}
      onSelect={handleSelect}
      tableRows={tableRows}
      range={range}
      onRangeChange={handleRangeChange}
      historyPoints={historyPoints}
      historyLoading={historyPricesQuery.isLoading}
      historyFilterLabel={historyFilterLabel}
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
