import { Link, useNavigate } from 'react-router'
import { Icon } from '../components/Icon'
import { NoteForm } from '../features/notes/components/NoteForm'
import { useCreateNote } from '../features/notes/hooks'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function CreateNotePage() {
  const navigate = useNavigate()
  const createNote = useCreateNote()
  useDocumentTitle('New note')

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/" className="btn btn-ghost btn-sm mb-4 -ms-3 text-base-content/70 hover:text-base-content">
        <Icon name="arrowLeft" />
        Back to notes
      </Link>
      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <h1 className="card-title text-2xl">Create a new note</h1>
          <NoteForm
            submitLabel="Create note"
            isSubmitting={createNote.isPending}
            submitError={createNote.error}
            onCancel={() => navigate('/')}
            onSubmit={(values) => createNote.mutate(values, { onSuccess: () => navigate('/') })}
          />
        </div>
      </div>
    </div>
  )
}
