import { ReactNode } from "react"

import { MainPagesHeader } from "@/components/header/main-pages-header"

interface MainPageLayoutProps {
  children: ReactNode
}

function MainPageLayout({ children }: MainPageLayoutProps) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader
        title="Главная"
        description="Недавние вакансии и резюме"
      />
      <div className="flex flex-col gap-10 pt-5">{children}</div>
    </div>
  )
}

export default MainPageLayout
