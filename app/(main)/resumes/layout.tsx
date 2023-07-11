import { ReactNode } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { MainPagesHeader } from "@/components/header/main-pages-header"

function ResumesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader title={"Ваши резюме"}>
        <Button variant="main" asChild>
          <Link href={"/create/resume"}>Создать резюме</Link>
        </Button>
      </MainPagesHeader>
      <div className="pt-5">{children}</div>
    </div>
  )
}

export default ResumesLayout
