import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { ProjectStatus } from "@/types/ProjectStatus"
import $api from "@/config/axios"

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
