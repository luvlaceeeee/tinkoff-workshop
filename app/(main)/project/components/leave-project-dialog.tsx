"use client"

import { redirect } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

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

export function LeaveProjectDialog(props: {
  projectId: number
  title: string
}) {
  const { projectId, title } = props
  const { mutate, isLoading } = useMutation(
    ["project-leave"],
    () =>
      $api.post(
        `projects/leave/${projectId}`,
        {},
        { params: { newLeaderId: null } }
      ),
    {
      onSuccess: () => {
        redirect("/projects")
      },
    }
  )

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="border-destructive/30 hover:bg-destructive/20"
        >
          Покинуть проект
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены, что хотите покинуть проект {title}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Вы сможете вернуться в него только через вакансии проекта
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
              Покинуть
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
