import { ReactNode } from "react"

import { MainPagesHeader } from "@/components/header/main-pages-header"

function CreateResumeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader title={"Создать резюме"} />
      {/* <Button className="absolute left-16" variant={"secondary"}>
        Назад
      </Button> */}
      <div className="pt-5">{children}</div>
    </div>
  )
}

export default CreateResumeLayout
