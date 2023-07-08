export function concatStrings(
  separator: string,
  ...string: (string | undefined)[]
): string | null {
  if (string && !string.length) return null
  return [...string].join(separator)
}
