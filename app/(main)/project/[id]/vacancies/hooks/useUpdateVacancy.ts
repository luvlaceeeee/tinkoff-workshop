import { Dispatch, SetStateAction } from "react"
import { useMutation } from "@tanstack/react-query"

import $api from "@/config/axios"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/components/providers"

import { ICreateVacancyRequests } from "../create/types/ICreateVacancyRequests"

export const useUpdateVacancy = (
  id: number,
  directionName: string,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  return useMutation(
    ["change-vacancy", id],
    (initial: ICreateVacancyRequests) =>
      $api.patch(`/positions/${id}`, initial),
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries(["project-vacancies"])
          .then(() => setOpen(false))
        toast({
          variant: "accept",
          title: `Вакансия ${directionName} обновлена`,
          description: "",
        })
      },
    }
  )
}
