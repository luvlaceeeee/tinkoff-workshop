"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { IVacancy } from "@/types/interfaces/IVacancy"
import $api from "@/config/axios"
import { Button } from "@/components/ui/button"

import { VacancyCard } from "./components/vacancy-card"

export default function ProjectVacanciesPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: vacancies = [], isLoading } = useQuery(
    ["project-vacancies", +params.id],
    () =>
      $api
        .get<IVacancy[]>(`positions/projects`, {
          params: { projectId: params.id, isVisible: true },
        })
        .then((res) => res.data)
  )

  if (isLoading) return <div>Loading</div>

  return (
    <div className="flex flex-col gap-5">
      <Button variant={"main"}>
        <Link href={`/project/${params.id}/vacancies/create`}>
          Создать новую вакансию
        </Link>
      </Button>
      {vacancies.map((vacancy) => (
        <VacancyCard {...vacancy} />
      ))}
    </div>
  )
}
