import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import { IUser } from "@/types/interfaces/IUser"
import $api from "@/config/axios"

export const useUser = () => {
  return useQuery<IUser, AxiosError<IErrorResponse>>(["user"], () =>
    $api.get<IUser>("/users").then((res) => res.data)
  )
}
