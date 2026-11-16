import { useState } from 'react'
import { ConfirmDialog } from '../../../components/ConfirmDialog'
import { Icon } from '../../../components/Icon'
import { useDeleteNote } from '../hooks'

interface DeleteNoteButtonProps {
  noteId: string
  noteTitle: string
  /** `ghost` is quiet (for cards), `soft` has a light red background (for the detail page). */
  variant?: 'ghost' | 'soft'
  className?: string
  onDeleted?: () => void
}

const VARIANT_CLASSES = {
  ghost: 'btn-ghost text-error hover:bg-error/10',
  soft: 'btn-soft btn-error',
}

export function DeleteNoteButton({ noteId, noteTitle, variant = 'ghost', className = '', onDeleted }: DeleteNoteButtonProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const deleteNote = useDeleteNote()

  function handleConfirm() {
    deleteNote.mutate(noteId, {
      onSuccess: () => {
        setIsConfirmOpen(false)
        onDeleted?.()
      },
    })
  }

  return (
    <>
      <button
        type="button"
        className={`btn btn-sm ${VARIANT_CLASSES[variant]} ${className}`}
        onClick={() => setIsConfirmOpen(true)}
      >
        <Icon name="trash" />
        Delete
      </button>
      {/* Only mount the dialog while it is needed, instead of one hidden dialog per card. */}
      {isConfirmOpen && (
        <ConfirmDialog
          open
          title="Delete this note?"
          message={`"${noteTitle}" will be deleted permanently. This cannot be undone.`}
          confirmLabel="Delete"
          isConfirming={deleteNote.isPending}
          onConfirm={handleConfirm}
          onClose={() => setIsConfirmOpen(false)}
        />
      )}
    </>
  )
}
