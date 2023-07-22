import { ReactNode } from "react"

import { MainPagesHeader } from "@/components/header/main-pages-header"

function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader
        title="Ваш профиль"
        description="Именно так другие будут видеть вас на сайте"
      />
      <div className="flex flex-col gap-3 pt-5 md:flex-row md:gap-10">
        {children}
      </div>
    </div>
  )
}

export default ProfileLayout
