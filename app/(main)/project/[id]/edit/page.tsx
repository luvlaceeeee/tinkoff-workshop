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
    <div className="flex flex-col justify-between gap-5 md:flex-row md:gap-10">
      <div className="w-full border-b pb-5 md:border-b-0 md:border-r md:pb-0 md:pr-10">
        <ProjectEditForm {...project} />
      </div>
      <ProjectEditMembers
        // members={project.members}
        projectId={project.id}
      />
    </div>
  )
}
