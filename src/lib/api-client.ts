import axios, { isAxiosError } from 'axios'

const DEFAULT_BASE_URL = 'https://thinkboard.codewithmmd.ir/api'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})

/** Every response from the backend is wrapped in this envelope. */
export interface ApiResponse<T> {
  success: boolean
  response: T
  status: number
}

/** Turns any thrown value into a message that is safe to show to the user. */
export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') return 'The server took too long to respond.'
    if (!error.response) return 'Network error. Check your internet connection.'

    const data = error.response.data as { message?: unknown; error?: unknown } | undefined
    if (typeof data?.message === 'string') return data.message
    if (typeof data?.error === 'string') return data.error
    if (error.response.status === 404) return 'Note not found.'
    return `Request failed with status ${error.response.status}.`
  }
  if (error instanceof Error) return error.message
  return 'Something went wrong.'
}

export type FieldErrors<Field extends string> = Partial<Record<Field, string>>

/**
 * When the server rejects the body (400), find which field it complained about
 * so the form can show the message under that input instead of a raw status code.
 * Returns null for any other kind of error.
 */
export function getFieldErrors<Field extends string>(
  error: unknown,
  fields: readonly Field[],
  fallbackField: Field,
  fallbackMessage: string,
): FieldErrors<Field> | null {
  if (!isAxiosError(error) || error.response?.status !== 400) return null

  const data = error.response.data as { message?: unknown; error?: unknown } | undefined
  const raw = [data?.message, data?.error].find((value) => typeof value === 'string') as string | undefined
  const text = raw?.toLowerCase() ?? ''
  const field = fields.find((name) => text.includes(name.toLowerCase())) ?? fallbackField
  // A generic server text like "Bad Request" does not help the user, so use our own message then.
  const isHelpful = raw && field && text.includes(field.toLowerCase())
  return { [field]: isHelpful ? raw : fallbackMessage } as FieldErrors<Field>
}
