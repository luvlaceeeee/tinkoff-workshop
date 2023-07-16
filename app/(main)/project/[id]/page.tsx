"use client"

import Link from "next/link"

import { IProject } from "@/types/interfaces/IProject"
import { generateKey } from "@/lib/generateKey"
import { statusMap } from "@/lib/statusMap"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { ProjectMembers } from "../components/project-members"
import { useProjectById } from "../hooks/useProjectById"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { data: project = {} as IProject, isLoading } = useProjectById(
    +params.id
  )

  return (
    <div className="flex justify-between gap-5">
      <div className="flex flex-1 flex-col gap-5 border-r">
        <section className="space-y-1">
          <h2 className="text-3xl font-semibold transition-colors">
            Статус проекта
          </h2>
          <p>{statusMap(project.status.description)}</p>
        </section>

        <section className="space-y-1">
          <h2 className="text-3xl font-semibold transition-colors">
            Инфраструктура
          </h2>
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
        </section>

        {/* <section>
          <h2 className="text-3xl font-semibold transition-colors">
            Вакансии проекта
          </h2>
        </section> */}

        <section>
          <h2 className="text-3xl font-semibold transition-colors">
            Тема проекта
          </h2>
          <p>{project.theme}</p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold transition-colors">Описание</h2>
          <p>{project.description}</p>
        </section>
      </div>

      <Separator orientation="vertical" />
      <ProjectMembers members={project.members} />
    </div>
  )
}
