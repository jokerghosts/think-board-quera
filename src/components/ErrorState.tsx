interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorState({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 rounded-box bg-base-100 px-6 py-12 text-center">
      <span aria-hidden="true" className="text-5xl">⚠️</span>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="max-w-md text-base-content/70">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-outline btn-primary mt-2" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}
