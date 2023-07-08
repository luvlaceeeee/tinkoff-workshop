import { redirect } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { signOut } from "next-auth/react"

import $api from "@/config/axios"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function DeleteAccountDialog() {
  const { mutate, isLoading } = useMutation(
    ["user-delete"],
    () => $api.delete("/users"),
    {
      onSuccess: () => {
        signOut()
        redirect("/")
      },
    }
  )

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full border-destructive hover:bg-destructive/20"
        >
          Удалить аккаунт
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены, что хотите удалить аккаунт?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Это навсегда удалит ваш аккаунт и всю информацию о нем с серверов
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={"destructive"}
              loading={isLoading}
              onClick={() => mutate()}
              disabled={isLoading}
            >
              Удалить
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
