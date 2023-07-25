"use client"

import { ReactNode } from "react"
import { notFound } from "next/navigation"

import { IProject } from "@/types/interfaces/IProject"

import { useProjectById } from "../../hooks/useProjectById"

export default function VacanciesLayout({
  children,
  params,
}: {
  params: { id: string }
  children: ReactNode
}) {
  const { data: project = {} as IProject, isLoading } = useProjectById(
    +params.id
  )

  if (!project.isLeader) notFound()

  return children
}
