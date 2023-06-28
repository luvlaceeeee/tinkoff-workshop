"use client"

import Link from "next/link"
import { useAuthStore } from "@/store/authStore"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export const LandingButtons = () => {
  const { isAuth } = useAuthStore((state) => state)
  return (
    <div className="space-x-4">
      <Button variant="main" className="relative">
        <Link href={isAuth ? "/searchTeam" : "/login"}>
          <span className="relative before:absolute before:-inset-0 before:bg-main before:blur-2xl ">
            <span className="relative">Найти команду</span>
          </span>
        </Link>
      </Button>
      <Button
        variant="outline"
        className="relative"
        onClick={() => {
          toast({
            variant: "accept",
            title: "Точно хочешь узнать больше?",
            description: "Может не надо?",
          })
        }}
      >
        Узнать больше
      </Button>
    </div>
  )
}
