import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import $api from "@/config/axios"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/components/providers"

import { EditProjectSchema } from "../types/editProjectSchema"

export const useUpdateProject = (id: number) => {
  return useMutation(
    ["update-project"],
    (initial: EditProjectSchema) =>
      $api.patch(`projects/${id}`, initial).then((res) => res.data),
    {
      onSuccess: () => {
        toast({
          variant: "accept",
          title: "Проект обновлен",
        })
        queryClient.invalidateQueries(["project", id])
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
