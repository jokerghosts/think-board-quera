import { Link } from 'react-router'
import { formatDate } from '../../../utils/format-date'
import type { Note } from '../types'
import { DeleteNoteButton } from './DeleteNoteButton'

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <article className="card h-full border-t-4 border-primary bg-base-100 shadow-sm transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="card-body gap-3">
        <h2 className="card-title line-clamp-1 break-all" dir="auto">
          <Link to={`/notes/${note.id}`} className="after:absolute after:inset-0">
            {note.title}
          </Link>
        </h2>
        <p className="line-clamp-3 whitespace-pre-line break-words text-base-content/70" dir="auto">
          {note.content}
        </p>
        <div className="card-actions mt-auto items-center justify-between pt-2">
          <time dateTime={note.createdAt} className="text-sm text-base-content/60">
            {formatDate(note.createdAt)}
          </time>
          {/* `relative z-10` keeps the buttons clickable above the card's stretched link. */}
          <div className="relative z-10 flex gap-2">
            <Link to={`/notes/${note.id}/edit`} className="btn btn-ghost btn-sm">
              Edit
            </Link>
            <DeleteNoteButton noteId={note.id} noteTitle={note.title} />
          </div>
        </div>
      </div>
    </article>
  )
}
