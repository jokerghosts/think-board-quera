import { Link } from 'react-router'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="font-mono text-6xl font-bold text-primary">404</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-base-content/70">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to notes
      </Link>
    </div>
  )
}
