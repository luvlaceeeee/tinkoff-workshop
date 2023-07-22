import { ReactNode } from "react"

import { BackButton } from "@/components/back-button"

import { MainPagesHeader } from "../../../components/header/main-pages-header"
import { SettingSidebar } from "./profile/components/sidebar"

//TODO Добавить дисейбл в зависимости от юрла
//TODO Подумать над страницей настроек сайта

function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader
        title="Настройки"
        description="Управляйте настройками своей учетной записи и настройками сайта"
      >
        <BackButton />
      </MainPagesHeader>
      <div className="flex flex-col gap-3 pt-5 md:flex-row md:gap-10">
        <SettingSidebar />
        {children}
      </div>
    </div>
  )
}

export default SettingsLayout
