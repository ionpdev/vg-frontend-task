import type { HistoryRange } from './models'

export const getRangeDates = (
  range: HistoryRange,
  endDate: Date = new Date(),
): { from: string; to: string } => {
  const end = new Date(Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate()))
  const start = new Date(end)

  switch (range) {
    case '1M':
      start.setUTCMonth(start.getUTCMonth() - 1)
      break
    case '3M':
      start.setUTCMonth(start.getUTCMonth() - 3)
      break
    case '6M':
      start.setUTCMonth(start.getUTCMonth() - 6)
      break
    case '1Y':
      start.setUTCFullYear(start.getUTCFullYear() - 1)
      break
    case 'ALL':
      start.setUTCFullYear(start.getUTCFullYear() - 5)
      break
    default:
      break
  }

  return {
    from: start.toISOString().slice(0, 10),
    to: end.toISOString().slice(0, 10),
  }
}
