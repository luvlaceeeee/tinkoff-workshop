"use client"

import { useState } from "react"

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
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState("")
  console.log(file)
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
              setOpen(false)
              setFile("")
            }}
          >
            Сохранить фото
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
