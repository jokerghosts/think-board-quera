import { Link, useNavigate, useParams } from 'react-router'
import { ErrorState } from '../components/ErrorState'
import { Icon } from '../components/Icon'
import { DeleteNoteButton } from '../features/notes/components/DeleteNoteButton'
import { NoteDetailSkeleton } from '../features/notes/components/NoteSkeletons'
import { useNote } from '../features/notes/hooks'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getErrorMessage } from '../lib/api-client'
import { formatDate } from '../utils/format-date'

export function NoteDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { data: note, isPending, isError, error, refetch } = useNote(id)
  useDocumentTitle(note?.title)

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/" className="btn btn-ghost btn-sm mb-4 -ms-3 text-base-content/70 hover:text-base-content">
        <Icon name="arrowLeft" />
        Back to notes
      </Link>

      {isPending ? (
        <NoteDetailSkeleton />
      ) : isError ? (
        <ErrorState title="Could not load this note" message={getErrorMessage(error)} onRetry={() => refetch()} />
      ) : (
        <article className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h1 className="text-2xl font-bold wrap-anywhere sm:text-3xl" dir="auto">
                {note.title}
              </h1>
              <div className="flex shrink-0 gap-2">
                <Link to={`/notes/${note.id}/edit`} className="btn btn-primary btn-sm flex-1 sm:flex-none">
                  <Icon name="pencil" />
                  Edit
                </Link>
                <DeleteNoteButton
                  noteId={note.id}
                  noteTitle={note.title}
                  variant="soft"
                  className="flex-1 sm:flex-none"
                  onDeleted={() => navigate('/', { replace: true })}
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-base-content/60">
              <span className="flex items-center gap-1">
                <Icon name="calendar" className="size-3.5" />
                <span>Created</span>
                <time dateTime={note.createdAt}>{formatDate(note.createdAt)}</time>
              </span>
              {note.updatedAt !== note.createdAt && (
                <span className="flex items-center gap-1">
                  <Icon name="pencil" className="size-3.5" />
                  <span>Updated</span>
                  <time dateTime={note.updatedAt}>{formatDate(note.updatedAt)}</time>
                </span>
              )}
            </div>
            <div className="border-t border-base-300" />
            <p className="leading-relaxed whitespace-pre-line wrap-anywhere" dir="auto">
              {note.content.trim()}
            </p>
          </div>
        </article>
      )}
    </div>
  )
}
