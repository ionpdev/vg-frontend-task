import { describe, expect, it } from "vitest"
import { formatChartDate } from "../index"

describe("formatChartDate", () => {
  it("formats ISO date into month/day label", () => {
    expect(formatChartDate("2024-02-09")).toBe("Feb 9")
  })

  it("returns input when not a valid date string", () => {
    expect(formatChartDate("not-a-date")).toBe("not-a-date")
  })

  it("returns input when parts are missing", () => {
    expect(formatChartDate("2024-02")).toBe("2024-02")
  })
})
