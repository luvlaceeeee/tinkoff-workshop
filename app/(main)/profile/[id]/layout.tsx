import { ReactNode } from "react"

import { MainPagesHeader } from "@/components/header/main-pages-header"

export default function UserProfileLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-col">
      <MainPagesHeader title="Профиль" />
      {children}
    </div>
  )
}
