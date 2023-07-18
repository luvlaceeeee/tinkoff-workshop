import { useUserStore } from "@/store/userStore"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import { IUser } from "@/types/interfaces/IUser"
import $api from "@/config/axios"

export const useUser = () => {
  const setUser = useUserStore((state) => state.setUser)

  return useQuery<IUser, AxiosError<IErrorResponse>>(
    ["user"],
    () => $api.get<IUser>("/users").then((res) => res.data),
    { onSuccess: (data) => setUser(data) }
  )
}
