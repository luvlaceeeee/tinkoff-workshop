"use client"

import Link from "next/link"
import { useAuthStore } from "@/store/authStore"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export const LandingButtons = () => {
  const { isAuth } = useAuthStore((state) => state)
  const redirectLink = isAuth ? "/searchTeam" : "/login"
  const testToast = () => {
    toast({
      variant: "accept",
      title: "Точно хочешь узнать больше?",
      description: "Может не надо?",
    })
  }

  return (
    <div className="space-x-4">
      <Button variant="main" className="relative">
        <Link href={redirectLink} prefetch={!isAuth}>
          <span className="relative before:absolute before:-inset-0 before:bg-main before:blur-2xl ">
            <span className="relative">Найти команду</span>
          </span>
        </Link>
      </Button>
      <Button variant="outline" className="relative" onClick={testToast}>
        Узнать больше
      </Button>
    </div>
  )
}
