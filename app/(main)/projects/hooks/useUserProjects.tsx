import { useQuery } from "@tanstack/react-query"

import { IProject } from "@/types/interfaces/IProject"
import $api from "@/config/axios"

export const useUserProjects = (isLead: boolean) => {
  return useQuery(["user-projects", isLead], () =>
    $api
      .get<IProject[]>(`/projects`, { params: { lead: isLead } })
      .then((res) => res.data)
  )
}
