"use client"

import { ReactNode } from "react"
import { LoaderIcon } from "lucide-react"
import { useSession } from "next-auth/react"

export function LoaderScreen({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const { status } = useSession()

  if (status === "loading") {
    return (
      <div
        role="status"
        className="flex h-screen flex-col items-center justify-center gap-6 animate-in fade-in duration-500"
      >
        <LoaderIcon className="h-12 w-12 animate-spin" />
        <span className="text-xl font-light tracking-tight">
          Загружаем ваши большие проекты
        </span>
      </div>
    )
  }

  return <>children</>
}
