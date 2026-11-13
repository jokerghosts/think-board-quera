import { useState } from 'react'
import { ConfirmDialog } from '../../../components/ConfirmDialog'
import { useDeleteNote } from '../hooks'

interface DeleteNoteButtonProps {
  noteId: string
  noteTitle: string
  className?: string
  onDeleted?: () => void
}

export function DeleteNoteButton({ noteId, noteTitle, className = '', onDeleted }: DeleteNoteButtonProps) {
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
        className={`btn btn-error btn-outline btn-sm ${className}`}
        onClick={() => setIsConfirmOpen(true)}
      >
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
