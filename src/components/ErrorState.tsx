import { Icon } from './Icon'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorState({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 rounded-box border border-base-300 bg-base-100 px-6 py-12 text-center">
      <span className="mb-1 grid size-14 place-items-center rounded-full bg-error/10 text-error">
        <Icon name="alert" className="size-7" />
      </span>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="max-w-md text-base-content/70">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-primary btn-soft mt-2" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}
