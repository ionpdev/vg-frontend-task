import type { FC } from 'react'

export interface SegmentedOption {
  value: string
  label: string
}

export interface SegmentedControlProps {
  value: string
  options: SegmentedOption[]
  onChange: (value: string) => void
}

export const SegmentedControl: FC<SegmentedControlProps> = ({
  value,
  options,
  onChange,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextValue = event.currentTarget.dataset.value

    if (!nextValue) {
      return
    }

    onChange(nextValue)
  }

  return (
    <div className="flex items-center rounded-full border border-[rgb(var(--border))] p-1">
      {options.map((option) => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition ${
              isActive
                ? 'bg-[rgb(var(--primary))] text-white'
                : 'text-[rgb(var(--fg))]/60'
            }`}
            data-value={option.value}
            onClick={handleClick}
            type="button"
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
