import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import $api from "@/config/axios"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/components/providers"

import { ICreateResumeRequest } from "../types/ICreateResumeRequest"

export const useCreateResume = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: (initial: ICreateResumeRequest) =>
      $api.post("resumes", initial),
    onSuccess: () => {
      toast({
        variant: "accept",
        title: "Резюме создано!",
        description: "Теперь оно видно в поиске",
      })
      queryClient.invalidateQueries(["user-resumes"])
      router.push("/resumes")
    },
    onError: (error: AxiosError<IErrorResponse>) =>
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: `${error.response?.data.message}`,
      }),
  })
}
