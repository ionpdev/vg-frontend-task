export type ThemeMode = "light" | "alt"

const THEME_KEY = "vg-theme"

export const getStoredTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light"
  }

  const stored = window.localStorage.getItem(THEME_KEY)

  return stored === "alt" ? "alt" : "light"
}

export const setStoredTheme = (value: ThemeMode) => {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(THEME_KEY, value)
}

export const applyTheme = (value: ThemeMode) => {
  if (typeof document === "undefined") {
    return
  }

  if (value === "alt") {
    document.documentElement.setAttribute("data-theme", "alt")
  } else {
    document.documentElement.removeAttribute("data-theme")
  }
}
