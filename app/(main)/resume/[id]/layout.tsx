"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useUserStore } from "@/store/userStore"

import { IResume } from "@/types/interfaces/IResume"
import { convertDate } from "@/lib/convertDate"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { MainPagesHeader } from "@/components/header/main-pages-header"
import { Icons } from "@/components/icons"
import { SendRequestToResumeDialog } from "@/components/send-request-to-resume-dialog"

import { useResumeById } from "../hooks/useResumeById"

export default function ResumeLayout({
  params,
  children,
}: {
  params: { id: string }
  children: ReactNode
}) {
  const { data: resume = {} as IResume, isLoading } = useResumeById(+params.id)
  const user = useUserStore((state) => state.user)

  if (isLoading)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 animate-in fade-in duration-500">
        <Icons.loader className="h-14 w-14 fill-main" />
      </div>
    )

  if (!resume.id) notFound()

  return (
    <div className="flex flex-col">
      <MainPagesHeader
        title={resume.direction.description}
        description={`Создано ${convertDate(resume.createdWhen)}`}
      >
        <div className="flex items-center gap-1 md:gap-2">
          <BackButton />
          {user.id !== resume.user.id ? (
            <SendRequestToResumeDialog resumeId={resume.id} />
          ) : (
            <Link href={"/resumes"}>
              <Button variant={"main"} asChild>
                Редактировать резюме
              </Button>
            </Link>
          )}
        </div>
      </MainPagesHeader>
      <div className="pt-5">{children}</div>
    </div>
  )
}
