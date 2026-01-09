import type { FC, ReactNode } from 'react'
import { HeaderActionButton, HeaderActionLink } from './HeaderActions'

export interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  actions?: ReactNode
  isAuthenticated?: boolean
  onLogout?: () => void
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  actions,
  isAuthenticated,
  onLogout,
}) => {
  const resolvedActions =
    actions ??
    (typeof isAuthenticated === 'boolean' ? (
      isAuthenticated ? (
        <>
          <HeaderActionLink to="/dashboard" variant="primary">
            View Dashboard
          </HeaderActionLink>
          {onLogout ? (
            <HeaderActionButton onClick={onLogout}>Logout</HeaderActionButton>
          ) : null}
        </>
      ) : (
        <HeaderActionLink to="/login" variant="primary">
          Login
        </HeaderActionLink>
      )
    ) : null)

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
      {resolvedActions ? (
        <div className="flex items-center gap-3">{resolvedActions}</div>
      ) : null}
    </div>
  )
}
