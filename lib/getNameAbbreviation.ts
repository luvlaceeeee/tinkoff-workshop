export const getNameAbbreviation = (fullName: string): string => {
  return fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
}
