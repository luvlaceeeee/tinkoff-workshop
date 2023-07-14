const noUpperSkills = ["java", "go", "dart"]

export const skillMap = (value: string) => {
  if (value.length < 5 && !noUpperSkills.includes(value))
    return value.toUpperCase()
  return value
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")
}
