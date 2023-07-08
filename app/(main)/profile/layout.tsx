import { ReactNode } from "react"

import { MainPagesHeader } from "../shared/components/main-pages-header"

function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader
        title="Ваш профиль"
        description="Именно так другие будут видеть вас на сайте"
      />
      <div className="flex gap-10 pt-5">{children}</div>
    </div>
  )
}

export default ProfileLayout
