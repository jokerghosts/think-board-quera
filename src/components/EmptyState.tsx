import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

interface EmptyStateProps {
  icon: IconName
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-box border border-dashed border-base-300 bg-base-100/50 px-6 py-16 text-center">
      <span className="mb-1 grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon name={icon} className="size-7" />
      </span>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="max-w-sm text-base-content/70 wrap-anywhere">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
