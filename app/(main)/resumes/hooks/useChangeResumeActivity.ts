import { useMutation } from "@tanstack/react-query"

import $api from "@/config/axios"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/components/providers"

export const useChangeResumeActivity = (id: number, directionName: string) => {
  return useMutation(
    ["change-activity", id],
    () => $api.post(`/resumes/active/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user-resumes"])
        toast({
          variant: "accept",
          title: `Резюме ${directionName} обновлено`,
          description: "",
        })
      },
    }
  )
}
