import { redirect } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { signOut } from "next-auth/react"

import $api from "@/config/axios"

export const useDeleteUser = () => {
  return useMutation(["user-delete"], () => $api.delete("/users"), {
    onSuccess: () => {
      signOut()
      redirect("/")
    },
  })
}
