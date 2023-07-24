import { Dispatch, SetStateAction } from "react"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import $api from "@/config/axios"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/components/providers"

export const useDeleteMember = (
  projectId: number,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  return useMutation(
    ["delete-user"],
    ({ userId, direction }: { userId: number; direction: string }) =>
      $api.post(
        `projects/${projectId}/delete-user`,
        {},
        {
          params: {
            userId,
            direction,
          },
        }
      ),
    {
      onSuccess: () =>
        queryClient
          .invalidateQueries(["project-members", projectId])
          .then(() => setOpen(false)),

      onError: (error: AxiosError<IErrorResponse>) => {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: error.response?.data.message,
        })
      },
    }
  )
}
