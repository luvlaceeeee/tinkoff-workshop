import { notFound, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import { IVacancy } from "@/types/interfaces/IVacancy"
import $api from "@/config/axios"

export const useVacancyById = (id: number) => {
  const router = useRouter()
  return useQuery(
    [`vacancy`, id],
    () => $api.get<IVacancy>(`positions/${id}`).then((res) => res.data),
    { onError: (error: AxiosError<IErrorResponse>) => notFound() }
  )
}
