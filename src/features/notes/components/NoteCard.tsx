import { useState } from 'react'
import { Link } from 'react-router'
import { Icon } from '../../../components/Icon'
import { formatDate } from '../../../utils/format-date'
import { useUpdateNote } from '../hooks'
import type { Note } from '../types'
import { DeleteNoteButton } from './DeleteNoteButton'
import { NoteForm } from './NoteForm'

/** Text for the short preview: no empty lines at the start or end, and no blank lines in between. */
function getPreview(content: string) {
  return content.trim().replace(/\n\s*\n+/g, '\n')
}

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  // While editing, the card shows a small form instead of the note, so the note is edited in its place.
  const [isEditing, setIsEditing] = useState(false)
  const updateNote = useUpdateNote(note.id)

  function stopEditing() {
    setIsEditing(false)
    updateNote.reset() // forget the error of the last try
  }

  if (isEditing) {
    return (
      <article
        className="card h-full min-w-0 border border-primary/60 bg-base-100 shadow-md"
        aria-label={`Editing "${note.title}"`}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && !updateNote.isPending) stopEditing()
        }}
      >
        <div className="card-body gap-3">
          <NoteForm
            compact
            initialValues={{ title: note.title, content: note.content }}
            submitLabel="Save"
            isSubmitting={updateNote.isPending}
            submitError={updateNote.error}
            onCancel={stopEditing}
            onSubmit={(values) => updateNote.mutate(values, { onSuccess: () => setIsEditing(false) })}
          />
        </div>
      </article>
    )
  }

  return (
    <article className="group card h-full min-w-0 border border-base-300 bg-base-100 shadow-sm transition-colors duration-200 hover:border-primary/50">
      <div className="card-body gap-3">
        <h2 className="card-title line-clamp-1 break-all text-lg" dir="auto">
          <Link
            to={`/notes/${note.id}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-primary"
          >
            {note.title}
          </Link>
        </h2>
        <p className="line-clamp-3 grow-0 whitespace-pre-line wrap-anywhere text-sm leading-relaxed text-base-content/70" dir="auto">
          {getPreview(note.content)}
        </p>
        <div className="card-actions mt-auto flex-wrap items-center justify-between gap-y-2 border-t border-base-300 pt-3">
          <time dateTime={note.createdAt} className="flex items-center gap-1.5 text-xs text-base-content/60">
            <Icon name="calendar" className="size-3.5" />
            {formatDate(note.createdAt)}
          </time>
          {/* `relative z-10` keeps the buttons clickable above the card's stretched link. */}
          <div className="relative z-10 ms-auto flex gap-1">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setIsEditing(true)}>
              <Icon name="pencil" />
              Edit
            </button>
            <DeleteNoteButton noteId={note.id} noteTitle={note.title} />
          </div>
        </div>
      </div>
    </article>
  )
}
