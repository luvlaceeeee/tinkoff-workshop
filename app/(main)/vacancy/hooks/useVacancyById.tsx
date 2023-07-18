import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { IVacancy } from "@/types/interfaces/IVacancy"
import $api from "@/config/axios"

export const useVacancyById = (id: number) => {
  return useQuery(
    [`vacancy`, id],
    () => $api.get<IVacancy>(`positions/${id}`).then((res) => res.data),
    { onError: () => notFound() }
  )
}
