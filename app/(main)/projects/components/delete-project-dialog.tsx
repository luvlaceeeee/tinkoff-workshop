"use client"

import { useMutation } from "@tanstack/react-query"
import { Trash } from "lucide-react"

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
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/components/providers"

export function DeleteProjectDialog(props: {
  projectId: number
  title: string
}) {
  const { projectId, title } = props

  const { mutate, isLoading } = useMutation(
    ["project-delete"],
    () => $api.delete(`projects/${projectId}`),
    {
      onSuccess: () => {
        toast({
          title: "Успешно",
          description: `Проект ${title} удален`,
          variant: "accept",
        })
        queryClient.invalidateQueries(["user-projects"])
        queryClient.invalidateQueries(["user"])
      },
    }
  )

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"outline"}
          className="border-destructive/30  bg-destructive/20 hover:bg-destructive/90"
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены, что хотите удалить проект {title}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Проект будет полностью стерт с наших серверов и не подлежит
            восстановлению
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
