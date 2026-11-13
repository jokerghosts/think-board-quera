import { SORT_OPTIONS, isSortOption, type SortOption } from '../utils'

interface NotesToolbarProps {
  search: string
  sort: SortOption
  onSearchChange: (value: string) => void
  onSortChange: (value: SortOption) => void
}

export function NotesToolbar({ search, sort, onSearchChange, onSortChange }: NotesToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="input w-full sm:flex-1">
        <svg aria-hidden="true" className="h-4 w-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          dir="auto"
          placeholder="Search notes..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Search notes"
        />
      </label>
      <select
        className="select w-full sm:w-52"
        value={sort}
        onChange={(event) => {
          if (isSortOption(event.target.value)) onSortChange(event.target.value)
        }}
        aria-label="Sort notes"
      >
        {Object.entries(SORT_OPTIONS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
