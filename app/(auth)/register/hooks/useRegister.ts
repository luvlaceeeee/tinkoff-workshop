import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import { toast } from "@/components/ui/use-toast"

import { IRegisterRequest } from "../types/IRegisterRequest"

export const useRegister = () => {
  const router = useRouter()
  //TODO Вынести как-то юрл бека
  return useMutation({
    mutationFn: (initial: IRegisterRequest) =>
      axios.post("http://localhost:8080/register", initial),
    onSuccess: () => {
      toast({
        variant: "accept",
        title: "Регистрация прошла успешно",
        description: "Авторизуйтесь",
      })
      router.push("/login")
    },
    onError: (error: AxiosError<IErrorResponse>) =>
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: `${error.response?.data.message}`,
      }),
  })
}
