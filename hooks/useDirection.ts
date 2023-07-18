import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { Direction } from "@/types/Direction"
import $api from "@/config/axios"

export const useDirection = (options?: UseQueryOptions<Direction[]>) => {
  return useQuery<Direction[]>(
    ["directions"],
    () =>
      $api.get<Direction[]>("dictionaries/directions").then((res) => res.data),
    { ...options }
  )
}
