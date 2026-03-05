const rtf = new Intl.RelativeTimeFormat("ru", {
  numeric: "auto",
})

export function formatRelativeTime(ts: number): string {
  const diffSec = (ts - Date.now()) / 1_000
  const absSec = Math.abs(diffSec)
  if (absSec < 60) return rtf.format(Math.round(diffSec), "second")
  if (absSec < 3_600) return rtf.format(Math.round(diffSec / 60), "minute")
  if (absSec < 86_400) return rtf.format(Math.round(diffSec / 3_600), "hour")
  return rtf.format(Math.round(diffSec / 86_400), "day")
}
