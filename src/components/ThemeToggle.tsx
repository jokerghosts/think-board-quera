import { useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'

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
      {/* `key` restarts the small spin animation every time the icon changes. */}
      <span key={String(isDark)} className="motion-safe:animate-[spin_0.4s_ease-out]">
        <Icon name={isDark ? 'sun' : 'moon'} className="size-5" />
      </span>
    </button>
  )
}
