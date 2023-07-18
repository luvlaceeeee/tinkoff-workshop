import { useMutation } from "@tanstack/react-query"

import $api from "@/config/axios"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/components/providers"

export const useChangeVacancyVisibility = (
  id: number,
  directionName: string
) => {
  return useMutation(
    ["change-vacancy-visibility", id],
    () => $api.post(`/positions/visible/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["project-vacancies"])
        toast({
          variant: "accept",
          title: `Вакансия ${directionName} обновлено`,
          description: "",
        })
      },
    }
  )
}
