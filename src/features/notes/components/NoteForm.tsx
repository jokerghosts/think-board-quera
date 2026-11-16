import { useEffect, useState, type FormEvent } from 'react'
import { getNoteFieldErrors } from '../hooks'
import type { NoteInput } from '../types'

// The server rejects longer titles (checked against the real API: 50 characters is the longest it accepts).
export const TITLE_MAX_LENGTH = 50

interface NoteFormProps {
  initialValues?: NoteInput
  submitLabel: string
  isSubmitting: boolean
  /** The error of the last submit, if the server rejected it (e.g. a title that is too long). */
  submitError?: unknown
  /** A smaller version of the form, used when a note is edited inside its card. */
  compact?: boolean
  onSubmit: (values: NoteInput) => void
  onCancel: () => void
}

type FormErrors = Partial<Record<keyof NoteInput, string>>

function validate(values: NoteInput): FormErrors {
  const errors: FormErrors = {}
  if (!values.title.trim()) errors.title = 'Title is required.'
  else errors.title = getTitleLengthError(values.title)
  if (!values.content.trim()) errors.content = 'Content is required.'
  return errors
}

function getTitleLengthError(title: string) {
  const extra = title.trim().length - TITLE_MAX_LENGTH
  if (extra <= 0) return undefined
  return `Title is too long. Remove ${extra} character${extra === 1 ? '' : 's'}.`
}

export function NoteForm({
  initialValues = { title: '', content: '' },
  submitLabel,
  isSubmitting,
  submitError,
  compact = false,
  onSubmit,
  onCancel,
}: NoteFormProps) {
  const [values, setValues] = useState<NoteInput>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})

  // When the server rejects a field, show its message under the matching input.
  useEffect(() => {
    const serverErrors = getNoteFieldErrors(submitError)
    if (serverErrors) setErrors((prev) => ({ ...prev, ...serverErrors }))
  }, [submitError])

  function handleChange(field: keyof NoteInput, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    // The title length is checked on every key press, so the user sees the problem right away.
    // Other errors are cleared as soon as the user starts fixing them.
    const liveError = field === 'title' ? getTitleLengthError(value) : undefined
    if (errors[field] || liveError) setErrors((prev) => ({ ...prev, [field]: liveError }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return
    onSubmit({ title: values.title.trim(), content: values.content.trim() })
  }

  const titleLength = values.title.trim().length

  return (
    <form onSubmit={handleSubmit} noValidate className={`flex flex-col ${compact ? 'gap-2' : 'gap-4'}`}>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Title</legend>
        <input
          type="text"
          dir="auto"
          className={`input w-full ${errors.title ? 'input-error' : ''}`}
          placeholder="Note title"
          value={values.title}
          onChange={(event) => handleChange('title', event.target.value)}
          aria-invalid={Boolean(errors.title)}
          autoFocus
        />
        <div className="flex justify-between">
          <span className="text-error">{errors.title}</span>
          <span className={titleLength > TITLE_MAX_LENGTH ? 'font-medium text-error' : 'text-base-content/50'}>
            {titleLength}/{TITLE_MAX_LENGTH}
          </span>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Content</legend>
        <textarea
          dir="auto"
          className={`textarea ${compact ? 'h-28' : 'h-48'} w-full resize-none ${errors.content ? 'textarea-error' : ''}`}
          placeholder="Write your note here..."
          value={values.content}
          onChange={(event) => handleChange('content', event.target.value)}
          aria-invalid={Boolean(errors.content)}
        />
        <span className="text-error">{errors.content}</span>
      </fieldset>

      <div className={compact ? 'flex justify-end gap-2' : 'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'}>
        <button type="button" className={`btn btn-ghost ${compact ? 'btn-sm' : ''}`} onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className={`btn btn-primary ${compact ? 'btn-sm' : ''}`} disabled={isSubmitting}>
          {isSubmitting && <span className="loading loading-spinner loading-sm" />}
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
