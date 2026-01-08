import type { FC, ReactNode } from 'react'

export interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  actions?: ReactNode
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  actions,
}) => {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-2">
        {badge ? (
          <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--fg))]/60">
            {badge}
          </p>
        ) : null}
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle ? (
          <p className="text-sm text-[rgb(var(--fg))]/70">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  )
}
