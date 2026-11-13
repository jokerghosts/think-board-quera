import { Link } from 'react-router'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-base-content/10 bg-base-100/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="font-mono text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          ThinkBoard
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <Link to="/notes/new" className="btn btn-primary btn-sm sm:btn-md">
            <span aria-hidden="true" className="text-lg leading-none">+</span>
            <span>New note</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
