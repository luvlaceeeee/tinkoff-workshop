"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Check } from "lucide-react"

import { IProject } from "@/types/interfaces/IProject"
import $api from "@/config/axios"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"

import { ProjectCard } from "./components/project-card"

export default function ProjectsPage() {
  const [isLead, setIsLead] = useState(false)
  const { data: projects = [], isLoading } = useQuery(
    ["user-projects", isLead],
    () =>
      $api
        .get<IProject[]>(`/projects`, { params: { lead: isLead } })
        .then((res) => res.data)
  )

  const Loader = () => (
    <div className="grid h-72 grid-cols-2 gap-4">
      <Separator className="h-full w-full rounded-2xl" />
      <Separator className="h-full w-full rounded-2xl" />
    </div>
  )

  // if (!projects.length)
  //   return (
  //     <p className="mx-auto text-sm text-muted-foreground">
  //       У вас нету проектов
  //     </p>
  //   )

  return (
    <div className="space-y-3">
      <Toggle variant="outline" pressed={isLead} onPressedChange={setIsLead}>
        <Check className="mr-2 h-4 w-4" />
        Созданные мной
      </Toggle>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard {...project} />
          ))}
        </div>
      )}
    </div>
  )
}
