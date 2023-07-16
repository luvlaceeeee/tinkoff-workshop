import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import $api from "@/config/axios"

type ProjectStatus = { statusName: string; description: string }

export const useProjectStatuses = (
  options?: UseQueryOptions<ProjectStatus[]>
) => {
  return useQuery<ProjectStatus[]>(
    ["statuses"],
    () =>
      $api
        .get<ProjectStatus[]>("dictionaries/project-statuses")
        .then((res) => res.data),
    { ...options }
  )
}
