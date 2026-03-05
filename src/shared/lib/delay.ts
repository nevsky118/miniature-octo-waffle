export function delay(ms = 500): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}
