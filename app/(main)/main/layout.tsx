import { ReactNode } from "react"

import { MainPagesHeader } from "../shared/components/main-pages-header"

interface MainPageLayoutProps {
  children: ReactNode
}

function MainPageLayout({ children }: MainPageLayoutProps) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader
        title="Главная"
        description="Узнайте актуальные новости платформы"
      />
      <div className="flex flex-col gap-10 pt-5">{children}</div>
    </div>
  )
}

export default MainPageLayout
