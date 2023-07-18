import { IVacancy } from "@/types/interfaces/IVacancy"

export interface IVacancySearchResponse {
  content: Omit<IVacancy, "isActive">[]
  pageCount: number
}
