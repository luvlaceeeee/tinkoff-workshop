"use client"

import { ReactNode } from "react"
import { notFound, useRouter } from "next/navigation"

import { IVacancy } from "@/types/interfaces/IVacancy"
import { convertDate } from "@/lib/convertDate"
import { BackButton } from "@/components/back-button"
import { MainPagesHeader } from "@/components/header/main-pages-header"
import { Icons } from "@/components/icons"
import { SendRequestToVacancyDialog } from "@/components/send-request-to-vacancy-dialog"

import { useVacancyById } from "../hooks/useVacancyById"

export default function VacancyLayout({
  params,
  children,
}: {
  params: { id: string }
  children: ReactNode
}) {
  const router = useRouter()
  const {
    data: vacancy = {} as IVacancy,
    isLoading,
    error,
  } = useVacancyById(+params.id)

  if (error?.status === 406) {
    router.back()
  }

  if (error) {
    notFound()
  }

  if (isLoading)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 animate-in fade-in duration-500">
        <Icons.loader className="h-14 w-14 fill-main" />
      </div>
    )

  return (
    <div className="flex flex-col">
      <MainPagesHeader
        title={vacancy.direction.description}
        description={convertDate(vacancy.createdWhen)}
      >
        <div className="flex items-center gap-1 md:gap-2">
          <BackButton />
          <SendRequestToVacancyDialog vacancyId={+params.id} />
        </div>
      </MainPagesHeader>
      <div className="pt-5">{children}</div>
    </div>
  )
}
