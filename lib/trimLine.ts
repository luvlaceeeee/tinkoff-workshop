export function trimLine(
  line: string | null | undefined,
  count: number
): string | null {
  if (line && count > 0) {
    return `${line.slice(0, count)}${line.length > count ? "..." : ""}`
  }
  return null
}
