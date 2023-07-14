import { ReactNode } from "react"

import { MainPagesHeader } from "@/components/header/main-pages-header"

export default function SearchResumesLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader
        title="Поиск резюме"
        description="Найдите нужного вам разработчика и пригласите его в команду"
      />
      <div className="pt-5">{children}</div>
    </div>
  )
}
