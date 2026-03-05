const formatter = new Intl.NumberFormat("ru", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
})

export function formatCount(value: number): string {
  return formatter.format(value)
}
