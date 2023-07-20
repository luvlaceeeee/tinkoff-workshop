import { MutationOptions, useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import $api from "@/config/axios"

export const useAcceptRequest = (
  requestId: number,
  options?: MutationOptions<unknown, AxiosError<IErrorResponse>>
) => {
  return useMutation(
    ["accept-request"],
    () =>
      $api
        .post(`/requests/${requestId}`, {}, { params: { isAccepted: true } })
        .then((res) => res.data),
    { ...options }
  )
}
