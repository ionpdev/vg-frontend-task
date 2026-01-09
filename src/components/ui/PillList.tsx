import type { FC } from "react"

export interface PillListProps {
  labels: string[]
}

export const PillList: FC<PillListProps> = ({ labels }) => {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {labels.map((label) => (
        <span
          key={label}
          className="rounded-full border border-[rgb(var(--border))] bg-[rgba(var(--fg),0.03)] px-3 py-1 text-xs font-semibold text-[rgb(var(--fg))]/70"
        >
          {label}
        </span>
      ))}
    </div>
  )
}
