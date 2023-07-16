"use client"

import { IProject } from "@/types/interfaces/IProject"
import { Separator } from "@/components/ui/separator"

import { ProjectEditForm } from "../../components/project-edit-form"
import { ProjectEditMembers } from "../../components/project-edit-members"
import { useProjectById } from "../../hooks/useProjectById"

export default function EditProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: project = {} as IProject, isLoading } = useProjectById(
    +params.id
  )

  if (isLoading) return <div>Loading</div>

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
