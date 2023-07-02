export const generateKey = (pre?: string) => {
  return `${pre}_${Math.random() * 1000}`
}
