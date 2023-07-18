"use client"

import { notFound } from "next/navigation"

import { IProject } from "@/types/interfaces/IProject"

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
    <div className="flex justify-between gap-10">
      <div className="w-full border-r pr-10">
        <ProjectEditForm {...project} />
      </div>
      <ProjectEditMembers
        // members={project.members}
        projectId={project.id}
      />
    </div>
  )
}
