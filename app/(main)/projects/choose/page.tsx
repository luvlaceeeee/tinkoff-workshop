"use client"

import { Separator } from "@/components/ui/separator"
import { LinkTitle } from "@/components/link-title"

import { useUserProjects } from "../hooks/useUserProjects"

export default function ProjectChoosePage() {
  const { data: projects = [], isLoading } = useUserProjects(true)

  const Loader = () => (
    <div className="space-y-3">
      <Separator className="h-20 w-full rounded-2xl" />
      <Separator className="h-20 w-full rounded-2xl" />
    </div>
  )
  return (
    <div className="space-y-3">
      <p>Выберите проект, чтобы создать вакансию</p>
      {!isLoading ? (
        projects.map((project) => (
          <p className="rounded-xl border px-5 py-4">
            <LinkTitle
              href={`/project/${project.id}/vacancies/create`}
              className="text-lg md:text-xl"
            >
              {project.title}
            </LinkTitle>
          </p>
        ))
      ) : (
        <Loader />
      )}
    </div>
  )
}
