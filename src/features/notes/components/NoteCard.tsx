import { Link } from 'react-router'
import { Icon } from '../../../components/Icon'
import { formatDate } from '../../../utils/format-date'
import type { Note } from '../types'
import { DeleteNoteButton } from './DeleteNoteButton'

/** Text for the short preview: no empty lines at the start or end, and no blank lines in between. */
function getPreview(content: string) {
  return content.trim().replace(/\n\s*\n+/g, '\n')
}

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <article className="group card h-full min-w-0 border border-base-300 bg-base-100 shadow-sm transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
      <div className="card-body gap-3">
        <h2 className="card-title line-clamp-1 break-all text-lg" dir="auto">
          <Link
            to={`/notes/${note.id}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-primary"
          >
            {note.title}
          </Link>
        </h2>
        <p className="line-clamp-3 whitespace-pre-line wrap-anywhere text-sm leading-relaxed text-base-content/70" dir="auto">
          {getPreview(note.content)}
        </p>
        <div className="card-actions mt-auto flex-wrap items-center justify-between gap-y-2 border-t border-base-300 pt-3">
          <time dateTime={note.createdAt} className="flex items-center gap-1.5 text-xs text-base-content/60">
            <Icon name="calendar" className="size-3.5" />
            {formatDate(note.createdAt)}
          </time>
          {/* `relative z-10` keeps the buttons clickable above the card's stretched link. */}
          <div className="relative z-10 ms-auto flex gap-1">
            <Link to={`/notes/${note.id}/edit`} className="btn btn-ghost btn-sm">
              <Icon name="pencil" />
              Edit
            </Link>
            <DeleteNoteButton noteId={note.id} noteTitle={note.title} />
          </div>
        </div>
      </div>
    </article>
  )
}
