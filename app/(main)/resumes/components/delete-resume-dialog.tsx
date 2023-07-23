import { useState } from "react"

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

import { useDeleteResume } from "../hooks/useDeleteResume"

interface DeleteResumeDialogProps {
  direction: string
  id: number
}

export function DeleteResumeDialog({ id, direction }: DeleteResumeDialogProps) {
  const [open, setOpen] = useState(false)

  const { mutate, isLoading } = useDeleteResume(id, direction, setOpen)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="border-destructive/30 bg-destructive/20 hover:bg-destructive/30"
        >
          Удалить резюме
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены, что хотите удалить резюме на позицию {direction}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Это навсегда удалит ваше резюме и всю информацию о нем с серверов
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
