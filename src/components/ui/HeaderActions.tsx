import type { FC, ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

export type HeaderActionVariant = 'primary' | 'secondary'

const variantClasses: Record<HeaderActionVariant, string> = {
  primary: 'bg-[rgb(var(--primary))] text-white',
  secondary: 'border border-[rgb(var(--border))] text-[rgb(var(--fg))]',
}

export interface HeaderActionLinkProps {
  to: string
  children: ReactNode
  variant?: HeaderActionVariant
}

export const HeaderActionLink: FC<HeaderActionLinkProps> = ({
  to,
  children,
  variant = 'secondary',
}) => {
  return (
    <Link
      className={`rounded-md px-4 py-2 text-sm font-semibold ${variantClasses[variant]}`}
      to={to}
    >
      {children}
    </Link>
  )
}

export interface HeaderActionButtonProps {
  children: ReactNode
  onClick: () => void
  variant?: HeaderActionVariant
}

export const HeaderActionButton: FC<HeaderActionButtonProps> = ({
  children,
  onClick,
  variant = 'secondary',
}) => {
  return (
    <button
      className={`rounded-md px-4 py-2 text-sm font-semibold ${variantClasses[variant]}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}
