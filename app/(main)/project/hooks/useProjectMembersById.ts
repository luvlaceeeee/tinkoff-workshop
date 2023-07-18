import { useQuery } from "@tanstack/react-query"

import { IProjectMember } from "@/types/interfaces/IProjectMember"
import $api from "@/config/axios"

export const useProjectMembersById = (id: number) => {
  return useQuery(["project-members", id], () =>
    $api
      .get<IProjectMember[]>(`/positions/projects/members`, {
        params: { projectId: id },
      })
      .then((res) => res.data)
  )
}
