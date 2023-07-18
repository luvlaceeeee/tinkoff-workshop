import { useQuery } from "@tanstack/react-query"

import { IResume } from "@/types/interfaces/IResume"
import $api from "@/config/axios"

export const useUserResumes = () => {
  return useQuery(["user-resumes"], () =>
    $api.get<IResume[]>("/resumes").then((res) => res.data)
  )
}
