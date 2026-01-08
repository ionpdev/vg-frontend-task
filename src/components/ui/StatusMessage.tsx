import type { FC } from 'react'

export interface StatusMessageProps {
  message: string
  tone?: 'info' | 'error'
}

const toneClasses: Record<NonNullable<StatusMessageProps['tone']>, string> = {
  info: 'text-slate-500',
  error: 'text-red-500',
}

export const StatusMessage: FC<StatusMessageProps> = ({
  message,
  tone = 'info',
}) => {
  return <p className={`text-sm ${toneClasses[tone]}`}>{message}</p>
}
