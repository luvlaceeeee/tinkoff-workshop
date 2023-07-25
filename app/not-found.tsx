import Link from "next/link"

import { Button } from "@/components/ui/button"
import { RightPartHeader } from "@/components/header/right-part-header"
import { SiteHeader } from "@/components/header/site-header"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader>
        {/* @ts-expect-error Server Component */}
        <RightPartHeader />
      </SiteHeader>
      <div className="container flex h-[calc(100vh-6rem)] items-center text-center animate-in fade-in duration-700 md:text-left">
        <div className="space-y-6">
          <span className="relative text-7xl font-extrabold tracking-tighter text-main before:absolute before:-inset-0 before:bg-main/30 before:blur-2xl">
            404
          </span>
          <p className="text-7xl font-bold">Такой страницы не существует :(</p>
          <Link href={"/"}>
            <Button variant={"main"} className="mt-6">
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
