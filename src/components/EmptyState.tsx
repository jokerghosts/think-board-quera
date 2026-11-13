import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: string
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-box border border-dashed border-base-content/20 px-6 py-16 text-center">
      <span aria-hidden="true" className="text-5xl">{icon}</span>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="max-w-sm text-base-content/70">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
