"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "./ui/button"

export function BackButton() {
  const router = useRouter()

  return (
    <Button variant={"secondary"} size={"sm"} onClick={() => router.back()}>
      <ArrowLeft className="mr-1 h-4 w-4 md:mr-2 md:h-5 md:w-5" />
      Назад
    </Button>
  )
}
