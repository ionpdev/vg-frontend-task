import type { FC } from 'react'

export interface SkeletonProps {
  className?: string
}

export const Skeleton: FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200/70 ${className ?? ''}`}
    />
  )
}
