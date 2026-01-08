import type { FC } from "react"

export interface TooltipProps {
  title: string
  value: string
}

export const Tooltip: FC<TooltipProps> = ({ title, value }) => {
  return (
    <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-2 text-xs shadow-sm text-[rgb(var(--fg))]">
      <p className="font-semibold">{title}</p>
      <p className="text-[rgb(var(--fg))]/70">{value}</p>
    </div>
  )
}
