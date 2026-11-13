import { Link, useNavigate, useParams } from 'react-router'
import { ErrorState } from '../components/ErrorState'
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
      <Link to="/" className="btn btn-ghost btn-sm mb-4">
        ← Back to notes
      </Link>

      {isPending ? (
        <NoteDetailSkeleton />
      ) : isError ? (
        <ErrorState title="Could not load this note" message={getErrorMessage(error)} onRetry={() => refetch()} />
      ) : (
        <article className="card bg-base-100 shadow-sm">
          <div className="card-body gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h1 className="text-2xl font-bold break-words sm:text-3xl" dir="auto">
                {note.title}
              </h1>
              <div className="flex shrink-0 gap-2">
                <Link to={`/notes/${note.id}/edit`} className="btn btn-primary btn-sm">
                  Edit
                </Link>
                <DeleteNoteButton noteId={note.id} noteTitle={note.title} onDeleted={() => navigate('/', { replace: true })} />
              </div>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-base-content/60">
              <span>
                Created <time dateTime={note.createdAt}>{formatDate(note.createdAt)}</time>
              </span>
              {note.updatedAt !== note.createdAt && (
                <span>
                  Updated <time dateTime={note.updatedAt}>{formatDate(note.updatedAt)}</time>
                </span>
              )}
            </div>
            <div className="divider my-0" />
            <p className="leading-relaxed whitespace-pre-line break-words" dir="auto">
              {note.content}
            </p>
          </div>
        </article>
      )}
    </div>
  )
}
