import { useState } from "react"
import { X } from "lucide-react"

import { concatStrings } from "@/lib/concatStrings"
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

import { useDeleteMember } from "../hooks/useDeleteMember"

interface DeleteResumeDialogProps {
  projectId: number
  userId: number
  direction: string
  name: string
  surname: string
}

export function DeleteMemberDialog({
  projectId,
  userId,
  direction,
  name,
  surname,
}: DeleteResumeDialogProps) {
  const [open, setOpen] = useState(false)

  const { mutate, isLoading } = useDeleteMember(projectId, setOpen)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="border-destructive/50"
          size="icon"
        >
          <X />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены, что хотите выгнать {concatStrings(" ", name, surname)}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Это навсегда удалить пользователя с проекта
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={"destructive"}
              loading={isLoading}
              onClick={() => mutate({ userId, direction })}
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
