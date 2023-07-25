"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { notFound, usePathname } from "next/navigation"
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

  if (!project.id) notFound()

  return (
    <div className="flex flex-col">
      <MainPagesHeader
        title={project.title}
        description={`Создан ${convertDate(project.createdWhen)}`}
      >
        <div className="flex items-center gap-2">
          <BackButton />
          <div className="hidden space-x-2 md:flex">
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
                <Link href={`/project/${params.id}/vacancies`}>
                  <Button
                    disabled={pathname === `/project/${params.id}/vacancies`}
                  >
                    Вакансии проекта
                  </Button>
                </Link>
                <Link href={`/project/${params.id}/edit`}>
                  <Button
                    variant={"main"}
                    disabled={pathname === `/project/${params.id}/edit`}
                  >
                    Редактировать проект
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </MainPagesHeader>
      {/* mobile */}
      <div className="mt-3 flex flex-col gap-2 md:hidden">
        {project.members.find((member) => member.userId === id) &&
          (project.isLeader ? (
            <LeaveLeadDialog title={project.title} projectId={project.id} />
          ) : (
            <LeaveProjectDialog title={project.title} projectId={project.id} />
          ))}
        {project.isLeader && (
          <>
            <Link href={`/project/${params.id}/vacancies`}>
              <Button
                className="w-full"
                disabled={pathname === `/project/${params.id}/vacancies`}
              >
                Вакансии проекта
              </Button>
            </Link>
            <Link href={`/project/${params.id}/edit`}>
              <Button
                variant={"main"}
                className="w-full"
                disabled={pathname === `/project/${params.id}/edit`}
              >
                Редактировать проект
              </Button>
            </Link>
          </>
        )}
      </div>

      <div className="pt-5">{children}</div>
    </div>
  )
}
