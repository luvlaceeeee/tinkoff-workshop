"use client"

import Link from "next/link"
import { useUserStore } from "@/store/userStore"

import { IProject } from "@/types/interfaces/IProject"
import { generateKey } from "@/lib/generateKey"
import { statusMap } from "@/lib/statusMap"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { AboutSection } from "@/components/sections/about-section"

import { ProjectMembers } from "../components/project-members"
import { useProjectById } from "../hooks/useProjectById"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { data: project = {} as IProject, isLoading } = useProjectById(
    +params.id
  )

  const { id } = useUserStore((state) => state.user)

  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:gap-10">
      <div className="flex flex-col gap-3 border-b pb-5 md:flex-1 md:gap-5 md:border-b-0 md:border-r md:pb-0 md:pr-5">
        <section className="space-y-1 md:space-y-2">
          <h2 className="text-2xl font-semibold transition-colors md:text-3xl">
            Статус проекта
          </h2>
          <Badge status={project.status.statusName}>
            {statusMap(project.status.description)}
          </Badge>
        </section>

        {project.members.find((member) => member.userId === id) && (
          <section className="space-y-0 md:space-y-1">
            <h2 className="text-2xl font-semibold transition-colors md:text-3xl">
              Инфраструктура
            </h2>
            {project.contacts.length ? (
              <ul className="ml-6 list-disc [&>li]:mt-2">
                {project.contacts.map((contact) => (
                  <li key={generateKey("li")}>
                    <p>{contact.description}</p>
                    <Link
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "h-fit p-0"
                      )}
                      target="_blank"
                      href={contact.link}
                    >
                      {contact.link}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Отсутствуют</p>
            )}
          </section>
        )}

        {/* <section>
          <h2 className="text-3xl font-semibold transition-colors">
            Вакансии проекта
          </h2>
        </section> */}

        <AboutSection
          title="Тема проекта"
          description={project.theme}
          titleSize="text-2xl md:text-3xl"
          className="space-y-0 md:space-y-1"
        />
        <AboutSection
          title="Описание"
          description={project.description}
          titleSize="text-2xl md:text-3xl"
          className="space-y-0 md:space-y-1"
        />
      </div>

      <ProjectMembers projectId={+params.id} />
    </div>
  )
}
