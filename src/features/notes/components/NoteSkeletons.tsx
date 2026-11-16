// Each skeleton copies the layout and classes of the real component it stands in for,
// so nothing jumps around when the data arrives.
import { Icon, type IconName } from '../../../components/Icon'

/** One grey bar that is exactly one line of text tall (it inherits the font size of its parent). */
function TextLine({ className = '' }: { className?: string }) {
  return (
    <span className="flex h-[1lh] w-full items-center">
      <span className={`skeleton h-[0.8em] ${className}`} />
    </span>
  )
}

/** A grey block with the exact size of a button with the same icon and label (both are made invisible). */
function ButtonSkeleton({ label, icon, className = '' }: { label: string; icon?: IconName; className?: string }) {
  return (
    <span className={`btn skeleton pointer-events-none rounded-field border-transparent text-transparent shadow-none ${className}`}>
      {icon && <Icon name={icon} />}
      {label}
    </span>
  )
}

/** Mirrors NoteCard. */
export function NoteCardSkeleton() {
  return (
    <div className="card h-full border border-base-300 bg-base-100 shadow-sm" aria-hidden="true">
      <div className="card-body gap-3">
        <div className="card-title text-lg">
          <TextLine className="w-3/4" />
        </div>
        <div className="text-sm leading-relaxed">
          <TextLine className="w-full" />
          <TextLine className="w-5/6" />
          <TextLine className="w-2/3" />
        </div>
        <div className="card-actions mt-auto items-center justify-between border-t border-base-300 pt-3">
          <div className="text-xs">
            <TextLine className="w-24" />
          </div>
          <div className="flex gap-1">
            <ButtonSkeleton label="Edit" icon="pencil" className="btn-sm" />
            <ButtonSkeleton label="Delete" icon="trash" className="btn-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}

/** Mirrors the note grid on the home page. */
export function NoteListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading notes" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <NoteCardSkeleton key={index} />
      ))}
    </div>
  )
}

/** Mirrors the note card on NoteDetailPage. */
export function NoteDetailSkeleton() {
  return (
    <div role="status" aria-label="Loading note" className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 text-2xl font-bold sm:text-3xl">
            <TextLine className="w-2/3" />
          </div>
          <div className="flex shrink-0 gap-2">
            <ButtonSkeleton label="Edit" icon="pencil" className="btn-sm" />
            <ButtonSkeleton label="Delete" icon="trash" className="btn-sm" />
          </div>
        </div>
        <div className="text-sm">
          <TextLine className="w-48" />
        </div>
        <div className="border-t border-base-300" />
        <div className="leading-relaxed">
          <TextLine className="w-full" />
          <TextLine className="w-full" />
          <TextLine className="w-3/4" />
        </div>
      </div>
    </div>
  )
}

/** Mirrors the edit card on EditNotePage (heading + NoteForm). Labels are real text because they never change. */
export function NoteFormSkeleton() {
  return (
    <div role="status" aria-label="Loading note" className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body">
        <h1 className="card-title text-2xl">Edit note</h1>
        <div className="flex flex-col gap-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <div className="input skeleton w-full rounded-field border-none" />
            <div className="flex justify-end">
              <TextLine className="w-10" />
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Content</legend>
            <div className="textarea skeleton h-48 w-full rounded-field border-none" />
            <span />
          </fieldset>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <ButtonSkeleton label="Cancel" />
            <ButtonSkeleton label="Save changes" />
          </div>
        </div>
      </div>
    </div>
  )
}
