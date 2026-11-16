import { Link, useNavigate, useParams } from 'react-router'
import { ErrorState } from '../components/ErrorState'
import { Icon } from '../components/Icon'
import { NoteForm } from '../features/notes/components/NoteForm'
import { NoteFormSkeleton } from '../features/notes/components/NoteSkeletons'
import { useNote, useUpdateNote } from '../features/notes/hooks'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getErrorMessage } from '../lib/api-client'

export function EditNotePage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { data: note, isPending, isError, error, refetch } = useNote(id)
  useDocumentTitle(note ? `Edit: ${note.title}` : 'Edit note')
  const updateNote = useUpdateNote(id)
  const detailPath = `/notes/${id}`

  return (
    <div className="mx-auto max-w-2xl">
      <Link to={detailPath} className="btn btn-ghost btn-sm mb-4 -ms-3 text-base-content/70 hover:text-base-content">
        <Icon name="arrowLeft" />
        Back to note
      </Link>

      {isPending ? (
        <NoteFormSkeleton />
      ) : isError ? (
        <ErrorState title="Could not load this note" message={getErrorMessage(error)} onRetry={() => refetch()} />
      ) : (
        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <h1 className="card-title text-2xl">Edit note</h1>
            <NoteForm
              // `key` remounts the form if a different note is loaded, so its state starts fresh.
              key={note.id}
              initialValues={{ title: note.title, content: note.content }}
              submitLabel="Save changes"
              isSubmitting={updateNote.isPending}
              submitError={updateNote.error}
              onCancel={() => navigate(detailPath)}
              onSubmit={(values) => updateNote.mutate(values, { onSuccess: () => navigate(detailPath) })}
            />
          </div>
        </div>
      )}
    </div>
  )
}
