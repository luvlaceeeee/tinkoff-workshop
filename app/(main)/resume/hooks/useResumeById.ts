import { notFound } from "next/dist/client/components/not-found"
import { useQuery } from "@tanstack/react-query"

import { IResume } from "@/types/interfaces/IResume"
import $api from "@/config/axios"

export const useResumeById = (id: number) => {
  return useQuery(
    [`resume`, id],
    () => $api.get<IResume>(`resumes/${id}`).then((res) => res.data),
    { onError: () => notFound() }
  )
}
