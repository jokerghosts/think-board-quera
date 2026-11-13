import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      className="btn btn-ghost btn-circle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
    >
      <span aria-hidden="true" className="text-xl transition-transform duration-300 hover:rotate-12">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
