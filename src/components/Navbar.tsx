import { Link } from 'react-router'
import { Icon } from './Icon'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-base-300 bg-base-100/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="grid size-8 place-items-center rounded-field bg-primary text-primary-content sm:size-9">
            <Icon name="note" className="size-5" />
          </span>
          <span>
            Think<span className="text-primary">Board</span>
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <Link to="/notes/new" className="btn btn-primary btn-sm sm:btn-md">
            <Icon name="plus" />
            <span>New note</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
