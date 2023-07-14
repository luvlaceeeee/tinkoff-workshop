import dayjs from "dayjs"

export const convertDate = (date: number): string => {
  return dayjs.unix(date).format("DD.MM.YYYY в HH:mm")
}
