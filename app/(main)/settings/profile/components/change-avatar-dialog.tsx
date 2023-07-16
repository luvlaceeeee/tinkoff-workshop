"use client"

import { useState } from "react"
import { useUserStore } from "@/store/userStore"
import { useMutation } from "@tanstack/react-query"

import $api from "@/config/axios"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function ChangeAvatarDialog() {
  const { id } = useUserStore((state) => state.user)
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState("")
  const { mutate, isLoading } = useMutation(
    ["change-avatar"],
    () => $api.post(`/avatar/${id}`, { file }),
    {
      onSuccess: () => {
        setOpen(false)
        setFile("")
      },
    }
  )
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant: "main" }))}>
        Обновить фото
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Обновление аватара</DialogTitle>
          <DialogDescription>Выберите файл и загрузите</DialogDescription>
        </DialogHeader>
        <Input
          type="file"
          value={file}
          onChange={(e) => setFile(e.target.value)}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              mutate()
            }}
            loading={isLoading}
            disabled={isLoading}
          >
            Сохранить фото
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
