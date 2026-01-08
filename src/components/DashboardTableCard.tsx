import type { FC } from "react"
import type {
  AssetClassTableRow,
  AssetTableRow,
} from "../domain/selectors/tableRows"
import { formatUsd } from "../domain/money"
import { Card } from "./ui/Card"

export interface DashboardTableCardProps {
  rows: Array<AssetTableRow | AssetClassTableRow>
  mode: "asset" | "assetClass"
  selectedKey?: string
  onSelect: (key: string) => void
}

export const DashboardTableCard: FC<DashboardTableCardProps> = ({
  rows,
  mode,
  selectedKey,
  onSelect,
}) => {
  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = event.currentTarget.dataset.key

    if (key) {
      onSelect(key)
    }
  }

  return (
    <Card title="Positions">
      <div className="overflow-x-auto rounded-lg border border-[rgb(var(--border))]">
        <div
          className={`grid items-center gap-4 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--fg))]/60 ${
            mode === "asset"
              ? "grid-cols-[minmax(160px,1fr)_minmax(90px,0.6fr)_minmax(110px,0.8fr)_minmax(120px,0.9fr)_minmax(90px,0.6fr)]"
              : "grid-cols-[minmax(180px,1fr)_minmax(140px,0.9fr)_minmax(90px,0.6fr)]"
          }`}
        >
          <span>{mode === "asset" ? "Asset" : "Asset Class"}</span>
          {mode === "asset" ? <span className="text-right">Qty</span> : null}
          {mode === "asset" ? (
            <span className="text-right">Avg Price</span>
          ) : null}
          <span className="text-right">Value</span>
          <span className="text-right">Weight</span>
        </div>
        <div className="divide-y divide-[rgb(var(--border))]">
          {rows.length === 0 ? (
            <div className="px-4 py-6 text-sm text-[rgb(var(--fg))]/60">
              No positions available.
            </div>
          ) : null}
          {rows.map((row) => {
            const isActive = row.key === selectedKey
            const assetRow = row as AssetTableRow
            const rowClasses =
              mode === "asset"
                ? "grid-cols-[minmax(160px,1fr)_minmax(90px,0.6fr)_minmax(110px,0.8fr)_minmax(120px,0.9fr)_minmax(90px,0.6fr)]"
                : "grid-cols-[minmax(180px,1fr)_minmax(140px,0.9fr)_minmax(90px,0.6fr)]"

            return (
              <button
                key={row.key}
                className={`grid w-full cursor-pointer items-center gap-4 px-4 py-3 text-left text-sm transition ${
                  isActive
                    ? "bg-[rgba(var(--primary),0.08)] text-[rgb(var(--primary))]"
                    : "text-[rgb(var(--fg))]/80 hover:bg-[rgba(var(--fg),0.04)]"
                } ${rowClasses}`}
                data-key={row.key}
                onClick={handleSelect}
                type="button"
              >
                <span className="font-medium">{row.label}</span>
                {mode === "asset" ? (
                  <span className="text-right tabular-nums">
                    {assetRow.quantity.toFixed(2)}
                  </span>
                ) : null}
                {mode === "asset" ? (
                  <span className="text-right tabular-nums">
                    {formatUsd(assetRow.price)}
                  </span>
                ) : null}
                <span className="text-right tabular-nums">
                  {formatUsd(row.value)}
                </span>
                <span className="text-right tabular-nums">
                  {row.percent.toFixed(1)}%
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
