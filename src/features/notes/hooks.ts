import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getErrorMessage, getFieldErrors } from '../../lib/api-client'
import { notesApi } from './api'
import type { Note, NoteInput } from './types'

const NOTE_FIELDS = ['title', 'content'] as const

/** Field errors for a rejected note body, shown under the inputs by the form. */
export function getNoteFieldErrors(error: unknown) {
  return getFieldErrors(error, NOTE_FIELDS, 'title', 'Title is too long. Please make it shorter.')
}

// Validation errors are shown under the inputs, so only toast the other errors.
function toastUnlessFieldError(error: unknown) {
  if (!getNoteFieldErrors(error)) toast.error(getErrorMessage(error))
}

/**
 * One place for every cache key of this feature, so reading and
 * invalidating the cache can never go out of sync because of a typo.
 */
export const noteKeys = {
  all: ['notes'] as const,
  detail: (id: string) => ['notes', id] as const,
}

export function useNotes() {
  return useQuery({ queryKey: noteKeys.all, queryFn: notesApi.getAll })
}

export function useNote(id: string) {
  return useQuery({
    queryKey: noteKeys.detail(id),
    queryFn: () => notesApi.getById(id),
    enabled: Boolean(id),
  })
}

export function useCreateNote() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: NoteInput) => notesApi.create(input),
    onSuccess: () => {
      toast.success('Note created')
      return queryClient.invalidateQueries({ queryKey: noteKeys.all })
    },
    onError: toastUnlessFieldError,
  })
}

export function useUpdateNote(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: NoteInput) => notesApi.update(id, input),
    onSuccess: (updated: Note) => {
      toast.success('Note updated')
      queryClient.setQueryData(noteKeys.detail(id), updated)
      // Replace the note inside the cached list, so its card changes right where it is.
      queryClient.setQueryData<Note[]>(noteKeys.all, (notes) =>
        notes?.map((note) => (note.id === id ? { ...note, ...updated } : note)),
      )
      return queryClient.invalidateQueries({ queryKey: noteKeys.all })
    },
    onError: toastUnlessFieldError,
  })
}

export function useDeleteNote() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => notesApi.remove(id),
    onSuccess: (_data, id) => {
      // Drop the note from the list right away so the UI does not wait for a refetch.
      queryClient.setQueryData<Note[]>(noteKeys.all, (notes) => notes?.filter((note) => note.id !== id))
      queryClient.removeQueries({ queryKey: noteKeys.detail(id) })
      toast.success('Note deleted')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}
