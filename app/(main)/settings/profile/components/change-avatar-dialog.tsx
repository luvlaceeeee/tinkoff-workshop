"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { toast } from "@/components/ui/use-toast"

//TODO Добавить кроп картинки и проверку на размер и тип файла
export function ChangeAvatarDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File>()

  const { mutate, isLoading } = useMutation(
    ["change-avatar"],
    () =>
      $api.post(
        `/files`,
        { picture: file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ),
    {
      onSuccess: () => {
        setOpen(false)
        toast({
          variant: "accept",
          title: "Фото обновлено",
          description: "Обновите страницу",
        })
        window.location.reload()
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
        <Input type="file" onChange={(e) => setFile(e.target.files![0])} />
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
