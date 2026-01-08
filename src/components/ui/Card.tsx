import type { FC, ReactNode } from 'react'

export interface CardProps {
  title?: string
  actions?: ReactNode
  children: ReactNode
}

export const Card: FC<CardProps> = ({ title, actions, children }) => {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
      {title || actions ? (
        <div className="mb-5 flex items-center justify-between gap-3">
          {title ? <h2 className="text-base font-semibold">{title}</h2> : null}
          {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
        </div>
      ) : null}
      {children}
    </div>
  )
}
