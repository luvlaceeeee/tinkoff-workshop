import { useQuery } from "@tanstack/react-query"

import { IProject } from "@/types/interfaces/IProject"
import $api from "@/config/axios"

export const useProjectById = (id: number) => {
  return useQuery(["project", id], () =>
    $api.get<IProject>(`/projects/${id}`).then((res) => res.data)
  )
}
