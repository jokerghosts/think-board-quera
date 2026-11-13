import type { Note } from './types'

export const SORT_OPTIONS = {
  newest: 'Newest first',
  oldest: 'Oldest first',
  updated: 'Recently updated',
  title: 'Title (A–Z)',
} as const

export type SortOption = keyof typeof SORT_OPTIONS

export function isSortOption(value: string | null): value is SortOption {
  return value !== null && value in SORT_OPTIONS
}

const byDate = (field: 'createdAt' | 'updatedAt') => (a: Note, b: Note) =>
  new Date(b[field]).getTime() - new Date(a[field]).getTime()

const comparators: Record<SortOption, (a: Note, b: Note) => number> = {
  newest: byDate('createdAt'),
  oldest: (a, b) => byDate('createdAt')(b, a),
  updated: byDate('updatedAt'),
  title: (a, b) => a.title.localeCompare(b.title),
}

/**
 * A pure function: same input, same output, no side effects.
 * That makes it easy to reason about and to test.
 */
export function filterAndSortNotes(notes: Note[], search: string, sort: SortOption): Note[] {
  const query = search.trim().toLowerCase()
  const filtered = query
    ? notes.filter(
        (note) => note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query),
      )
    : notes
  // `toSorted` returns a new array, so the cached data from React Query is never mutated.
  return filtered.toSorted(comparators[sort])
}
