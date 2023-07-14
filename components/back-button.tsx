"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "./ui/button"

export function BackButton() {
  const router = useRouter()
  return (
    <Button variant={"secondary"} onClick={() => router.back()}>
      <ArrowLeft className="mr-2 h-5 w-5" />
      Назад
    </Button>
  )
}
