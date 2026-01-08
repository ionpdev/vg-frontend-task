import type { FC, ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

export type HeaderActionVariant = 'primary' | 'secondary'

const variantClasses: Record<HeaderActionVariant, string> = {
  primary:
    'bg-[rgb(var(--primary))] text-white hover:brightness-95 active:brightness-90',
  secondary:
    'border border-[rgb(var(--border))] text-[rgb(var(--fg))] hover:bg-[rgba(var(--fg),0.04)]',
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
      className={`cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition ${variantClasses[variant]}`}
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
      className={`cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition ${variantClasses[variant]}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}
