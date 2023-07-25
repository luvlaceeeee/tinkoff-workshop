import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import { IUser } from "@/types/interfaces/IUser"
import $api from "@/config/axios"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/components/providers"

import { UserProfileSchema } from "../types/userProfileSchema"

type UpdateProfileRequests = Omit<UserProfileSchema, "contacts"> & {
  contacts: string[] | undefined
}

export const useUpdateProfile = (reset: unknown) => {
  return useMutation(
    ["user-change"],
    (values: UpdateProfileRequests) =>
      $api.patch<IUser>("/users", values).then((res) => res.data),
    {
      onSuccess: (data) => {
        toast({
          variant: "accept",
          title: "Профиль обновлен",
        })
        //@ts-ignore
        reset({
          ...data,
          contacts: data?.contacts.map((contact) => ({
            value: contact,
          })),
        })
        queryClient.invalidateQueries({ queryKey: ["user"] })
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: `${error.response?.data.message}`,
        })
      },
    }
  )
}
