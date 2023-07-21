"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUserStore } from "@/store/userStore"

import { IProject } from "@/types/interfaces/IProject"
import { convertDate } from "@/lib/convertDate"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { MainPagesHeader } from "@/components/header/main-pages-header"
import { Icons } from "@/components/icons"

import { LeaveLeadDialog } from "../components/leave-lead-dialog"
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

  const { id } = useUserStore((state) => state.user)

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
          {project.members.find((member) => member.userId === id) &&
            (project.isLeader ? (
              <LeaveLeadDialog title={project.title} projectId={project.id} />
            ) : (
              <LeaveProjectDialog
                title={project.title}
                projectId={project.id}
              />
            ))}

          {project.isLeader && (
            <>
              <Button disabled={pathname === `/project/${params.id}/vacancies`}>
                <Link href={`/project/${params.id}/vacancies`}>
                  Вакансии проекта
                </Link>
              </Button>
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
