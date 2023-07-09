import { IVacancy } from "@/types/interfaces/IVacancy"

export type IVacancyResponse = Pick<
  IVacancy,
  "description" | "direction" | "id" | "project" | "skills" | "createWhen"
>[]
