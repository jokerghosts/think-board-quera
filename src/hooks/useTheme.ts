import { useEffect, useState } from 'react'

export type Theme = 'forest' | 'emerald'

const STORAGE_KEY = 'think-board-theme'
const DARK: Theme = 'forest'
const LIGHT: Theme = 'emerald'

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === DARK || saved === LIGHT) return saved
  } catch {
    // localStorage can be blocked (private mode); fall back to the system setting.
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK
}

/** A custom hook: a normal function that uses other hooks, so components can share this logic. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Ignore: the theme still works for this visit.
    }
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === DARK ? LIGHT : DARK))

  return { isDark: theme === DARK, toggleTheme }
}
