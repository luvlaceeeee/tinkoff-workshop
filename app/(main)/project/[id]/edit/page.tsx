"use client"

import { notFound } from "next/navigation"

import { IProject } from "@/types/interfaces/IProject"
import { Separator } from "@/components/ui/separator"

import { useProjectById } from "../../hooks/useProjectById"
import { ProjectEditForm } from "./components/project-edit-form"
import { ProjectEditMembers } from "./components/project-edit-members"

export default function EditProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: project = {} as IProject, isLoading } = useProjectById(
    +params.id
  )

  if (isLoading) return <div>Loading</div>
  if (!project.isLeader) notFound()

  return (
    <div className="flex justify-between gap-5">
      <div className="flex flex-1 gap-5">
        <ProjectEditForm {...project} />
        <Separator orientation="vertical" />
      </div>
      <ProjectEditMembers members={project.members} id={project.id} />
    </div>
  )
}
