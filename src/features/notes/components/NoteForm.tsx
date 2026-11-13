import { useState, type FormEvent } from 'react'
import type { NoteInput } from '../types'

const TITLE_MAX_LENGTH = 100

interface NoteFormProps {
  initialValues?: NoteInput
  submitLabel: string
  isSubmitting: boolean
  onSubmit: (values: NoteInput) => void
  onCancel: () => void
}

type FormErrors = Partial<Record<keyof NoteInput, string>>

function validate(values: NoteInput): FormErrors {
  const errors: FormErrors = {}
  if (!values.title.trim()) errors.title = 'Title is required.'
  else if (values.title.trim().length > TITLE_MAX_LENGTH)
    errors.title = `Title must be at most ${TITLE_MAX_LENGTH} characters.`
  if (!values.content.trim()) errors.content = 'Content is required.'
  return errors
}

export function NoteForm({
  initialValues = { title: '', content: '' },
  submitLabel,
  isSubmitting,
  onSubmit,
  onCancel,
}: NoteFormProps) {
  const [values, setValues] = useState<NoteInput>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})

  function handleChange(field: keyof NoteInput, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    // Clear the error of a field as soon as the user starts fixing it.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    onSubmit({ title: values.title.trim(), content: values.content.trim() })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Title</legend>
        <input
          type="text"
          dir="auto"
          className={`input w-full ${errors.title ? 'input-error' : ''}`}
          placeholder="Note title"
          value={values.title}
          maxLength={TITLE_MAX_LENGTH + 20}
          onChange={(event) => handleChange('title', event.target.value)}
          aria-invalid={Boolean(errors.title)}
          autoFocus
        />
        <div className="flex justify-between">
          <span className="text-error">{errors.title}</span>
          <span className="text-base-content/50">
            {values.title.trim().length}/{TITLE_MAX_LENGTH}
          </span>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Content</legend>
        <textarea
          dir="auto"
          className={`textarea h-48 w-full ${errors.content ? 'textarea-error' : ''}`}
          placeholder="Write your note here..."
          value={values.content}
          onChange={(event) => handleChange('content', event.target.value)}
          aria-invalid={Boolean(errors.content)}
        />
        <span className="text-error">{errors.content}</span>
      </fieldset>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting && <span className="loading loading-spinner loading-sm" />}
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
