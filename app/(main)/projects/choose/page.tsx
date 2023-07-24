"use client"

import Link from "next/link"

import { generateKey } from "@/lib/generateKey"
import { Separator } from "@/components/ui/separator"
import { LinkTitle } from "@/components/link-title"

import { useUserProjects } from "../hooks/useUserProjects"

export default function ProjectChoosePage() {
  const { data: projects = [], isLoading } = useUserProjects(true)

  const Loader = () => (
    <div className="grid grid-cols-2 gap-2">
      <Separator className="h-20 w-full rounded-2xl" />
      <Separator className="h-20 w-full rounded-2xl" />
      <Separator className="h-20 w-full rounded-2xl" />
      <Separator className="h-20 w-full rounded-2xl" />
    </div>
  )
  return (
    <div className="space-y-3">
      <p>Выберите проект, чтобы создать вакансию</p>
      {!isLoading ? (
        <div className="grid gap-2 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={generateKey("projects")}
              href={`/project/${project.id}/vacancies/create`}
              className="cursor-pointer"
            >
              <p className="rounded-xl border bg-secondary/20 px-5 py-4 text-center hover:bg-secondary/30">
                <LinkTitle
                  href={`/project/${project.id}/vacancies/create`}
                  className="text-lg md:text-xl"
                >
                  {project.title}
                </LinkTitle>
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}
