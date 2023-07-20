import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import $api from "@/config/axios"

import { IVacancyRequest } from "../types/IVacancyRequest"

export const useVacancyRequests = (
  vacancyId: number,
  query: "INCOMING" | "SENT" | "RECENT",
  options?: UseQueryOptions<IVacancyRequest[]>
) => {
  return useQuery<IVacancyRequest[]>(
    ["vacancy-requests", vacancyId, query],
    () =>
      $api
        .get<IVacancyRequest[]>(`/requests/vacancies/${vacancyId}`, {
          params: { requestType: query },
        })
        .then((res) => res.data),
    { ...options }
  )
}
