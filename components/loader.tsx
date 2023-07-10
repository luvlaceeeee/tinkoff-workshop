"use client"

import { ReactNode } from "react"
import { useSession } from "next-auth/react"

import { Icons } from "./icons"

export function LoaderScreen({ children }: { children: ReactNode }) {
  const { status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-6 animate-in fade-in duration-500">
        <Icons.loader className="h-14 w-14 fill-main" />
        <span className="text-xl font-light tracking-tight">
          Загружаем ваши большие проекты
        </span>
      </div>
    )
  }

  return <>{children}</>
}
