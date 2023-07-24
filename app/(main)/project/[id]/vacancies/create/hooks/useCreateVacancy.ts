import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import { IVacancy } from "@/types/interfaces/IVacancy"
import $api from "@/config/axios"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/components/providers"

import { ICreateVacancyRequests } from "../types/ICreateVacancyRequests"

export const useCreateVacancy = (projectId: number) => {
  const router = useRouter()
  return useMutation(
    ["create-vacancy"],
    (initial: ICreateVacancyRequests) =>
      $api
        .post<IVacancy>(`/positions`, initial, { params: { projectId } })
        .then((res) => res.data),
    {
      onSuccess: () => {
        toast({
          variant: "accept",
          title: "Вакансия создана",
          description: "Теперь она видна всем",
        })

        queryClient.invalidateQueries(["project-vacancies", projectId])
        router.push(`/project/${projectId}/vacancies`)
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        console.log(error)
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: `${error.response?.data.message}`,
        })
      },
    }
  )
}
