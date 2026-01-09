import { useCallback, useMemo, useState } from "react"
import { getApiErrorMessage } from "../api"
import { useAssetsQuery } from "../api/hooks/useAssetsQuery"
import { usePortfolioQuery } from "../api/hooks/usePortfolioQuery"
import { usePricesQuery } from "../api/hooks/usePricesQuery"
import { getRangeDates } from "../domain/dateRange"
import type { HistoryRange } from "../domain/models"
import { historySeries } from "../domain/selectors/history"
import { enrichPositions } from "../domain/selectors/enrichPositions"
import {
  buildAllocationRows,
  buildAssetClassRows,
  buildAssetRows,
} from "../domain/selectors/tableRows"

type DashboardMode = "asset" | "assetClass"

export interface DashboardViewModel {
  assetsCount: number
  positionsCount: number
  pricesCount: number
  isLoading: boolean
  hasError: boolean
  errorMessage: string
  isPricesLoading: boolean
  mode: DashboardMode
  allocations: ReturnType<typeof buildAllocationRows>
  selectedKey?: string
  onModeChange: (mode: DashboardMode) => void
  onSelect: (key: string) => void
  tableRows: ReturnType<typeof buildAssetRows> | ReturnType<typeof buildAssetClassRows>
  range: HistoryRange
  onRangeChange: (range: HistoryRange) => void
  historyPoints: ReturnType<typeof historySeries>
  historyLoading: boolean
  historyFilterLabel: string
}

const DEFAULT_RANGE: HistoryRange = "1M"

export const useDashboardViewModel = (): DashboardViewModel => {
  const [mode, setMode] = useState<DashboardMode>("asset")
  const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined)
  const [range, setRange] = useState<HistoryRange>(DEFAULT_RANGE)
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
    const rows =
      mode === "asset"
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
    return historySeries({
      prices: historyPrices,
      quantitiesByAsset,
      fillMode: "none",
    })
  }, [historyPricesQuery.data, quantitiesByAsset])

  const handleModeChange = useCallback((nextMode: DashboardMode) => {
    setMode(nextMode)
    setSelectedKey(undefined)
  }, [])

  const handleSelect = useCallback((key: string) => {
    setSelectedKey((current) => (current === key ? undefined : key))
  }, [])

  const handleRangeChange = useCallback((nextRange: HistoryRange) => {
    setRange(nextRange)
  }, [])

  const historyFilterLabel = useMemo(() => {
    if (!selectedKey) {
      return "All assets"
    }

    return mode === "asset" ? `Asset: ${selectedKey}` : `Class: ${selectedKey}`
  }, [mode, selectedKey])

  const combinedError =
    assetsError ?? portfolioError ?? pricesError ?? historyPricesQuery.error

  return {
    assetsCount: assets?.length ?? 0,
    positionsCount: portfolio?.positions.length ?? 0,
    pricesCount: prices?.length ?? 0,
    isLoading: assetsLoading || portfolioLoading,
    hasError: Boolean(combinedError),
    errorMessage: getApiErrorMessage(combinedError),
    isPricesLoading: pricesLoading,
    mode,
    allocations,
    selectedKey,
    onModeChange: handleModeChange,
    onSelect: handleSelect,
    tableRows,
    range,
    onRangeChange: handleRangeChange,
    historyPoints,
    historyLoading: historyPricesQuery.isLoading,
    historyFilterLabel,
  }
}
