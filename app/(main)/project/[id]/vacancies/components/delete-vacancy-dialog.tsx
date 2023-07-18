import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
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

interface DeleteResumeDialogProps {
  direction: string
  id: number
  projectId: number
}

export function DeleteVacancyDialog({
  id,
  direction,
  projectId,
}: DeleteResumeDialogProps) {
  const { mutate, isLoading } = useMutation(
    ["vacancy-delete"],
    () => $api.delete(`/positions/${id}`),
    {
      onSuccess: () => {
        toast({
          variant: "accept",
          title: `Вакансия на направление ${direction} удалена`,
        })
        queryClient.invalidateQueries(["project-vacancies", projectId])
        setOpen(false)
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        toast({
          variant: "destructive",
          title: `Что-то пошло не так...`,
          description: `Ошибка: ${error.response?.data.message}`,
        })
      },
    }
  )

  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="border-destructive/30 hover:bg-destructive/20"
        >
          Удалить вакансию
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены, что хотите удалить вакансию на позицию {direction}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Это навсегда удалит вакансию и всю информацию о ней с серверов
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
