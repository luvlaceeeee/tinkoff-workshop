"use client"

import { Link } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { RightPartHeader } from "@/components/header/right-part-header"
import { SiteHeader } from "@/components/header/site-header"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader>
            {/* @ts-expect-error Server Component */}
            <RightPartHeader />
          </SiteHeader>
          <div className="container flex h-[calc(100vh-6rem)] items-center animate-in fade-in duration-700">
            <div className="space-y-6">
              <span className="relative text-7xl font-extrabold tracking-tighter text-main before:absolute before:-inset-0 before:bg-main/30 before:blur-2xl">
                Неожиданная ошибка
              </span>
              <p className="text-7xl font-bold">Как такое произошло?...</p>
              <Button variant={"main"} asChild>
                <Link href={"/"}>Вернуться на главную</Link>
                <BackButton />
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
