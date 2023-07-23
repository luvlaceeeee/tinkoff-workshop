import { ReactNode } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { MainPagesHeader } from "@/components/header/main-pages-header"

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader title="Ваши проекты">
        <Link href="/create/project">
          <Button variant={"main"}>Создать проект</Button>
        </Link>
      </MainPagesHeader>
      <div className="pt-5">{children}</div>
    </div>
  )
}
