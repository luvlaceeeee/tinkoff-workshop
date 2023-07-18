import { ReactNode } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"

import { MainPagesHeader } from "../../../components/header/main-pages-header"

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
      <div className="flex gap-10 pt-5">
        <section className="flex h-full w-60 flex-shrink-0 flex-col gap-3 border-r pr-5">
          <Button variant={"secondary"} disabled={true} asChild>
            <Link href={"/settings/profile"}>Профиль</Link>
          </Button>
          {/* <Button variant={"secondary"} asChild>
            <Link href={"/settings/appearance"}>Настройки сайта</Link>
          </Button> */}
        </section>
        {children}
      </div>
    </div>
  )
}

export default SettingsLayout
