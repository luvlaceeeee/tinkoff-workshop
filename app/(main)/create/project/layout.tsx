import { ReactNode } from "react"

import { BackButton } from "@/components/back-button"
import { MainPagesHeader } from "@/components/header/main-pages-header"

export default function CreateProjectLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader title="Создать проект ">
        <BackButton />
      </MainPagesHeader>
      <div className="pt-5">{children}</div>
    </div>
  )
}
