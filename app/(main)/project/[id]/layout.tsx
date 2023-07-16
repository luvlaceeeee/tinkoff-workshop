"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { IProject } from "@/types/interfaces/IProject"
import { convertDate } from "@/lib/convertDate"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { MainPagesHeader } from "@/components/header/main-pages-header"
import { Icons } from "@/components/icons"

import { LeaveProjectDialog } from "../components/leave-project-dialog"
import { useProjectById } from "../hooks/useProjectById"

export default function ProjectLayout({
  params,
  children,
}: {
  params: { id: string }
  children: ReactNode
}) {
  const { data: project = {} as IProject, isLoading } = useProjectById(
    +params.id
  )
  const pathname = usePathname()

  if (isLoading)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 animate-in fade-in duration-500">
        <Icons.loader className="h-14 w-14 fill-main" />
      </div>
    )

  return (
    <div className="flex flex-col">
      <MainPagesHeader
        title={project.title}
        description={`Создан ${convertDate(project.createdWhen)}`}
      >
        <div className="flex items-center gap-2">
          <BackButton />
          <LeaveProjectDialog title={project.title} projectId={project.id} />
          {project.isLeader && (
            <>
              <Button>Вакансии проекта</Button>
              <Button
                variant={"main"}
                disabled={pathname === `/project/${params.id}/edit`}
              >
                <Link href={`/project/${params.id}/edit`}>
                  Редактировать проект
                </Link>
              </Button>
            </>
          )}
        </div>
      </MainPagesHeader>
      <div className="pt-5">{children}</div>
    </div>
  )
}
