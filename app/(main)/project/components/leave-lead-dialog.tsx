"use client"

import { useState } from "react"
import { redirect } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import $api from "@/config/axios"
import { concatStrings } from "@/lib/concatStrings"
import { generateKey } from "@/lib/generateKey"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"
import { queryClient } from "@/components/providers"

import { useProjectMembersById } from "../hooks/useProjectMembersById"

export function LeaveLeadDialog(props: { projectId: number; title: string }) {
  const { projectId, title } = props
  const [newLeadId, setNewLeadId] = useState<number | null>(null)
  const { mutate, isLoading } = useMutation(
    ["project-leave"],
    () =>
      $api.post(
        `projects/leave/${projectId}`,
        {},
        { params: { newLeaderId: newLeadId } }
      ),
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries(["user-projects"])
          .then(() => redirect("/projects"))
        queryClient.invalidateQueries(["user"])
      },
    }
  )

  const { data: members = [], isLoading: isMembersLoading } =
    useProjectMembersById(projectId)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="border-destructive/30  bg-destructive/20 hover:bg-destructive/90"
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
            Вы потеряете все права создателя, а вернуться в проект сможете
            только через вакансии
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Select
          onValueChange={(value) => setNewLeadId(+value)}
          // onOpenChange={() => refetchProjects()}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите нового лидера проекта" />
          </SelectTrigger>
          <SelectContent>
            {isMembersLoading ? (
              <Icons.loader className="mx-auto h-7 w-7 fill-main" />
            ) : members.filter((member) => !member.isLead).length ? (
              members
                .filter((member) => !member.isLead)
                .map((member) => (
                  <SelectItem
                    key={generateKey("user")}
                    className="rounded-xl"
                    value={`${member.userId}`}
                  >
                    {concatStrings(" ", member.name, member.surname)}
                  </SelectItem>
                ))
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                В проекте больше нет пользователей
              </p>
            )}
          </SelectContent>
        </Select>
        <p className="text-sm text-destructive">
          Если вы не выберите ни одного пользователя, проект будет полностью
          удален!
        </p>
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
