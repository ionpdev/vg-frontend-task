import type { FC, ReactNode } from "react"
import { useEffect, useState } from "react"
import type { ThemeMode } from "../libs/theme"
import { applyTheme, getStoredTheme, setStoredTheme } from "../libs/theme"
import { ThemeToggle } from "./ThemeToggle"

export interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => getStoredTheme())

  useEffect(() => {
    applyTheme(theme)
    setStoredTheme(theme)
  }, [theme])

  const handleThemeChange = (next: ThemeMode) => {
    setTheme(next)
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex items-center justify-end pb-4">
          <ThemeToggle value={theme} onChange={handleThemeChange} />
        </div>
        {children}
      </div>
    </div>
  )
}
