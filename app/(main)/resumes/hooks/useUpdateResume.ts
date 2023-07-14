import { Dispatch, SetStateAction } from "react"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import $api from "@/config/axios"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/components/providers"

import { ICreateResumeRequest } from "../../create/resume/types/ICreateResumeRequest"

export const useUpdateResume = (
  id: number,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  return useMutation({
    mutationFn: (initial: ICreateResumeRequest) =>
      $api.patch(`/resumes/${id}`, initial),
    onSuccess: () => {
      toast({
        variant: "accept",
        title: "Резюме обновлено",
      })
      queryClient.invalidateQueries(["user-resumes"])
      setOpen(false)
    },
    onError: (error: AxiosError<IErrorResponse>) =>
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: `${error.response?.data.message}`,
      }),
  })
}
