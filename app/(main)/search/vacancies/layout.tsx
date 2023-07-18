import { ReactNode } from "react"

import { MainPagesHeader } from "@/components/header/main-pages-header"

export default function SearchVacanciesLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader
        title="Поиск проекта"
        description="Найдите подходящую вам вакансию и отправьте запрос"
      />
      <div className="pt-5">{children}</div>
    </div>
  )
}
