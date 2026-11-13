import { useDeferredValue, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { EmptyState } from '../components/EmptyState'
import { ErrorState } from '../components/ErrorState'
import { NoteCard } from '../features/notes/components/NoteCard'
import { NoteListSkeleton } from '../features/notes/components/NoteSkeletons'
import { NotesToolbar } from '../features/notes/components/NotesToolbar'
import { useNotes } from '../features/notes/hooks'
import { filterAndSortNotes, isSortOption, type SortOption } from '../features/notes/utils'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getErrorMessage } from '../lib/api-client'

const DEFAULT_SORT: SortOption = 'newest'

export function HomePage() {
  const { data: notes, isPending, isError, error, refetch } = useNotes()
  useDocumentTitle('My notes')

  // Search and sort live in the URL (?q=...&sort=...), so a refresh or a shared link keeps them.
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''
  const sortParam = searchParams.get('sort')
  const sort = isSortOption(sortParam) ? sortParam : DEFAULT_SORT

  // Typing stays responsive; filtering a long list can lag one render behind.
  const deferredSearch = useDeferredValue(search)

  const visibleNotes = useMemo(
    () => filterAndSortNotes(notes ?? [], deferredSearch, sort),
    [notes, deferredSearch, sort],
  )

  function updateParam(key: string, value: string, defaultValue = '') {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value === defaultValue) next.delete(key)
        else next.set(key, value)
        return next
      },
      { replace: true },
    )
  }

  function renderContent() {
    if (isPending) {
      return (
        <NoteListSkeleton />
      )
    }

    if (isError) {
      return <ErrorState title="Could not load notes" message={getErrorMessage(error)} onRetry={() => refetch()} />
    }

    if (notes.length === 0) {
      return (
        <EmptyState
          icon="📝"
          title="No notes yet"
          description="Ready to organize your thoughts? Create your first note to get started."
          action={
            <Link to="/notes/new" className="btn btn-primary">
              Create your first note
            </Link>
          }
        />
      )
    }

    if (visibleNotes.length === 0) {
      return (
        <EmptyState
          icon="🔍"
          title="No matching notes"
          description={`Nothing matches "${deferredSearch.trim()}". Try another word.`}
          action={
            <button type="button" className="btn btn-ghost" onClick={() => updateParam('q', '')}>
              Clear search
            </button>
          }
        />
      )
    }

    return (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleNotes.map((note) => (
          <li key={note.id} className="relative">
            <NoteCard note={note} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">My notes</h1>
          {notes && notes.length > 0 && (
            <p className="text-sm text-base-content/60">
              {visibleNotes.length === notes.length
                ? `${notes.length} notes`
                : `${visibleNotes.length} of ${notes.length} notes`}
            </p>
          )}
        </div>
      </div>
      <NotesToolbar
        search={search}
        sort={sort}
        onSearchChange={(value) => updateParam('q', value)}
        onSortChange={(value) => updateParam('sort', value, DEFAULT_SORT)}
      />
      {renderContent()}
    </div>
  )
}
