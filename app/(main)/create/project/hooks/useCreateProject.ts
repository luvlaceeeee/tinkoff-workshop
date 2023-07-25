import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import { IProject } from "@/types/interfaces/IProject"
import $api from "@/config/axios"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/components/providers"

import { ProjectSchema } from "../types/projectSchema"

export const useCreateProject = () => {
  const router = useRouter()
  return useMutation(
    ["create-project"],
    (initial: ProjectSchema) =>
      $api.post<IProject>("/projects", initial).then((res) => res.data),
    {
      onSuccess: (project) => {
        toast({
          variant: "accept",
          title: "Проект создан!",
          description: "Создайте вакансию, чтобы найти людей",
        })

        router.replace(`/project/${project.id}`)

        queryClient.invalidateQueries(["user-projects"])
        queryClient.invalidateQueries(["user"])
      },
      onError: (error: AxiosError<IErrorResponse>) =>
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: `${error.response?.data.message}`,
        }),
    }
  )
}
