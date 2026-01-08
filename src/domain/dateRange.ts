import type { HistoryRange } from "./models"

// Normalizes date ranges for the history API query (UTC, day-level).
export const getRangeDates = (
  range: HistoryRange,
  endDate: Date = new Date()
): { from: string; to: string } => {
  const end = new Date(
    Date.UTC(
      endDate.getUTCFullYear(),
      endDate.getUTCMonth(),
      endDate.getUTCDate()
    )
  )
  const start = new Date(end)

  const clampToMonth = (year: number, month: number, day: number) => {
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
    return new Date(Date.UTC(year, month, Math.min(day, daysInMonth)))
  }

  const shiftMonths = (date: Date, months: number) => {
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + months
    const day = date.getUTCDate()
    const nextYear = year + Math.floor(month / 12)
    const nextMonth = ((month % 12) + 12) % 12
    return clampToMonth(nextYear, nextMonth, day)
  }

  const shiftYears = (date: Date, years: number) => {
    const year = date.getUTCFullYear() + years
    const month = date.getUTCMonth()
    const day = date.getUTCDate()
    return clampToMonth(year, month, day)
  }

  switch (range) {
    case "1M":
      return {
        from: shiftMonths(start, -1).toISOString().slice(0, 10),
        to: end.toISOString().slice(0, 10),
      }
    case "3M":
      return {
        from: shiftMonths(start, -3).toISOString().slice(0, 10),
        to: end.toISOString().slice(0, 10),
      }
    case "6M":
      return {
        from: shiftMonths(start, -6).toISOString().slice(0, 10),
        to: end.toISOString().slice(0, 10),
      }
    case "1Y":
      return {
        from: shiftYears(start, -1).toISOString().slice(0, 10),
        to: end.toISOString().slice(0, 10),
      }
    case "ALL":
      return {
        from: shiftYears(start, -5).toISOString().slice(0, 10),
        to: end.toISOString().slice(0, 10),
      }
    default:
      break
  }

  return {
    from: start.toISOString().slice(0, 10),
    to: end.toISOString().slice(0, 10),
  }
}
