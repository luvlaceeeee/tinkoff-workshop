import { useQuery } from "@tanstack/react-query"

import { IUser } from "@/types/interfaces/IUser"
import $api from "@/config/axios"

export const useUserById = (id: number) => {
  return useQuery([`user`, id], () =>
    $api.get<IUser>(`users/${id}`).then((res) => res.data)
  )
}
