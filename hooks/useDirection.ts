import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import $api from "@/config/axios"

type Direction = { directionName: string; description: string }

export const useDirection = (options?: UseQueryOptions<Direction[]>) => {
  return useQuery<Direction[]>(
    ["resume-directions"],
    () =>
      $api
        .get<Direction[]>("dictionaries/directions/resumes")
        .then((res) => res.data),
    { ...options }
  )
}
