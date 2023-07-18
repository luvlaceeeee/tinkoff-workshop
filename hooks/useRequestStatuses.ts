import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { RequestStatus } from "@/types/RequestStatus"
import $api from "@/config/axios"

export const useRequestStatuses = (
  options?: UseQueryOptions<RequestStatus[]>
) => {
  return useQuery<RequestStatus[]>(
    ["directions"],
    () =>
      $api
        .get<RequestStatus[]>("dictionaries/request-statuses")
        .then((res) => res.data),
    { ...options }
  )
}
