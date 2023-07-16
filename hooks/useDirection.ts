import { useQuery } from "@tanstack/react-query"

import $api from "@/config/axios"

type Direction = { directionName: string; description: string }

export const useDirection = () => {
  return useQuery<Direction[]>(["directions"], () =>
    $api.get<Direction[]>("dictionaries/directions").then((res) => res.data)
  )
}
