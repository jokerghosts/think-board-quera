export function NoteCardSkeleton() {
  return (
    <div className="card h-full border-t-4 border-base-300 bg-base-100 shadow-sm" aria-hidden="true">
      <div className="card-body gap-3">
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
        <div className="mt-4 flex items-center justify-between">
          <div className="skeleton h-4 w-24" />
          <div className="flex gap-2">
            <div className="skeleton h-8 w-14" />
            <div className="skeleton h-8 w-16" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function NoteListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading notes" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <NoteCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function NoteDetailSkeleton() {
  return (
    <div role="status" aria-label="Loading note" className="card bg-base-100 shadow-sm">
      <div className="card-body gap-4">
        <div className="skeleton h-8 w-2/3" />
        <div className="skeleton h-4 w-40" />
        <div className="divider my-0" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-3/4" />
      </div>
    </div>
  )
}
