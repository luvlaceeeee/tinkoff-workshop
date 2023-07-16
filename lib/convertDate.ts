import dayjs from "dayjs"

export const convertDate = (date: number): string => {
  return dayjs(date).format("DD.MM.YYYY в HH:mm")
}
