import type { FC } from "react"
import { HeaderActionButton, HeaderActionLink, PageHeader, StatusMessage } from "../ui"

export interface DashboardViewProps {
  badge: string
  title: string
  assetsCount: number
  positionsCount: number
  pricesCount: number
  isLoading: boolean
  hasError: boolean
  errorMessage: string
  isPricesLoading: boolean
  onLogout: () => void
}

export const DashboardView: FC<DashboardViewProps> = ({
  badge,
  title,
  assetsCount,
  positionsCount,
  pricesCount,
  isLoading,
  hasError,
  errorMessage,
  isPricesLoading,
  onLogout,
}) => {
  return (
    <div className="space-y-6">
      <PageHeader
        badge={badge}
        title={title}
        actions={
          <>
            <HeaderActionLink to="/">Back home</HeaderActionLink>
            <HeaderActionButton onClick={onLogout}>Logout</HeaderActionButton>
          </>
        }
      />
      {isLoading ? <StatusMessage message="Loading dashboard data..." /> : null}
      {hasError ? (
        <StatusMessage message={errorMessage} tone="error" />
      ) : null}
      {!isLoading && !hasError ? (
        <div className="grid gap-3 text-sm text-slate-500">
          <p>Assets loaded: {assetsCount}</p>
          <p>Positions loaded: {positionsCount}</p>
          <p>Prices loaded: {pricesCount}</p>
          {isPricesLoading ? (
            <StatusMessage message="Loading prices..." />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
