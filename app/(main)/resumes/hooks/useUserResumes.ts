import { useQuery } from "@tanstack/react-query"

import { IResume } from "@/types/interfaces/IResume"
import $api from "@/config/axios"

export const useUserResumes = (isActive: boolean) => {
  return useQuery(["user-resumes", isActive], () =>
    $api
      .get<IResume[]>("/resumes", { params: { isActive } })
      .then((res) => res.data)
  )
}
