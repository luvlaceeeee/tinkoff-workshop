import { useQuery } from "@tanstack/react-query"

import { IResume } from "@/types/interfaces/IResume"
import $api from "@/config/axios"

export const useResume = (id: number) => {
  return useQuery([`resume-${id}`], () =>
    $api.get<IResume>(`resumes/${id}`).then((res) => res.data)
  )
}
