import { ReactNode } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { MainPagesHeader } from "../shared/components/main-pages-header"

function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader
        title="Настройки"
        description="Управляйте настройками своей учетной записи и настройками сайта"
      />
      <div className="flex gap-10 pt-5">
        <section className="flex h-full w-60 flex-shrink-0 flex-col gap-3 border-r pr-5">
          <Button variant={"secondary"} asChild>
            <Link href={"/settings/profile"}>Профиль</Link>
          </Button>
          <Button variant={"secondary"} asChild>
            <Link href={"/settings/appearance"}>Настройки сайта</Link>
          </Button>
        </section>
        {children}
      </div>
    </div>
  )
}

export default SettingsLayout
