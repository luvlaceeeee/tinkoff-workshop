"use client"

import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
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
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

//TODO Добавить кроп картинки и проверку на размер и тип файла
export function ChangeAvatarDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File>()
  const [error, setError] = useState<string>()

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0].size > 3_145_728) {
      setError("Картинка слишком большая")
      e.target.value = ""
      return
    }

    setError("")
    setFile(e.target.files![0])
  }

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
        window.location.reload()
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: error.response?.data.message,
        })
      },
    }
  )
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(buttonVariants({ variant: "main" }), "w-full")}
      >
        Обновить фото
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Обновление аватара</DialogTitle>
          <DialogDescription>Выберите файл и загрузите</DialogDescription>
        </DialogHeader>
        <Input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={(e) => onFileChange(e)}
        />

        <Label className="text-xs text-muted-foreground">
          Максимальный размер файла до 5 мб. Доступные форматы: PNG, JPG, JPEG
        </Label>
        {error && <Label className="text-destructive">{error}</Label>}
        <DialogFooter>
          <Button
            onClick={() => {
              mutate()
            }}
            loading={isLoading}
            disabled={isLoading || !file}
          >
            Сохранить фото
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
