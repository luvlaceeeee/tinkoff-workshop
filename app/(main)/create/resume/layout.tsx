import { ReactNode } from "react"

import { MainPagesHeader } from "@/components/header/main-pages-header"

function CreateResumeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader title={"Создать резюме"} />
      <div className="flex pt-5">{children}</div>
    </div>
  )
}

export default CreateResumeLayout
