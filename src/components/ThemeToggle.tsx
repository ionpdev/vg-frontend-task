import type { FC } from "react"

export interface ThemeToggleProps {
  value: "light" | "alt"
  onChange: (value: "light" | "alt") => void
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ value, onChange }) => {
  const handleToggle = () => {
    const nextValue = value === "alt" ? "light" : "alt"
    onChange(nextValue)
  }

  return (
    <button
      className="rounded-full border border-[rgb(var(--border))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--fg))]/60"
      onClick={handleToggle}
      type="button"
    >
      Theme: {value}
    </button>
  )
}
