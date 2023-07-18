import { Dispatch, SetStateAction } from "react"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import $api from "@/config/axios"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/components/providers"

export const useDeleteResume = (
  id: number,
  direction: string,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  return useMutation(["resume-delete"], () => $api.delete(`/resumes/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user-resumes"])
      toast({
        variant: "accept",
        title: `Резюме на направление ${direction} удалено`,
      })
      setOpen(false)
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      toast({
        variant: "destructive",
        title: `Что-то пошло не так...`,
        description: `Ошибка: ${error.response?.data.message}`,
      })
    },
  })
}
