import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/header/site-header"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex h-[calc(100vh-6rem)] items-center animate-in fade-in duration-700">
        <div className="space-y-6">
          <span className="relative text-7xl font-extrabold tracking-tighter text-main before:absolute before:-inset-0 before:bg-main/30 before:blur-2xl">
            404
          </span>
          <p className="text-7xl font-bold">Такой страницы не существует :(</p>
          <Button variant={"main"} asChild>
            <Link href={"/"}>Вернуться на главную</Link>
            {/* <BackButton /> */}
          </Button>
        </div>
      </div>
    </div>
  )
}
