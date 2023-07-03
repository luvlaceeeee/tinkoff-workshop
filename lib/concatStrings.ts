export function concatStrings(
  separator: string,
  ...string: string[]
): string | null {
  if (!string.length) return null
  return [...string].join(separator)
}
