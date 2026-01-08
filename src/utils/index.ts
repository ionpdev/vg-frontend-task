export const formatChartDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number)

  if (!year || !month || !day) {
    return value
  }

  const date = new Date(Date.UTC(year, month - 1, day))

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}
