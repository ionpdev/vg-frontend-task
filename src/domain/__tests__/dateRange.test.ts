import { describe, expect, it } from 'bun:test'
import { getRangeDates } from '../dateRange'

const toDate = (value: string) => new Date(value + 'T00:00:00Z')

const daysBetween = (from: string, to: string) => {
  const diff = toDate(to).getTime() - toDate(from).getTime()
  return Math.round(diff / (1000 * 60 * 60 * 24))
}

describe('getRangeDates', () => {
  it('returns a 1M range', () => {
    const { from, to } = getRangeDates('1M', new Date('2024-02-15T00:00:00Z'))

    expect(to).toBe('2024-02-15')
    expect(daysBetween(from, to)).toBeGreaterThanOrEqual(28)
    expect(daysBetween(from, to)).toBeLessThanOrEqual(31)
  })

  it('returns a 1Y range', () => {
    const { from, to } = getRangeDates('1Y', new Date('2024-03-01T00:00:00Z'))

    expect(to).toBe('2024-03-01')
    expect(daysBetween(from, to)).toBeGreaterThanOrEqual(365)
    expect(daysBetween(from, to)).toBeLessThanOrEqual(366)
  })

  it('returns an ALL range', () => {
    const { from, to } = getRangeDates('ALL', new Date('2024-01-01T00:00:00Z'))

    expect(to).toBe('2024-01-01')
    expect(daysBetween(from, to)).toBeGreaterThanOrEqual(1825)
  })

  it('handles month-end boundaries', () => {
    const { from, to } = getRangeDates('1M', new Date('2024-03-31T00:00:00Z'))

    expect(to).toBe('2024-03-31')
    expect(from).toBe('2024-02-29')
  })

  it('handles leap year day for 1Y range', () => {
    const { from, to } = getRangeDates('1Y', new Date('2024-02-29T00:00:00Z'))

    expect(to).toBe('2024-02-29')
    expect(from).toBe('2023-02-28')
  })
})
