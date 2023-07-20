"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { IVacancy } from "@/types/interfaces/IVacancy"
import $api from "@/config/axios"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { VacancyCard } from "./components/vacancy-card"

export default function ProjectVacanciesPage({
  params,
}: {
  params: { id: string }
}) {
  const [isVisible, setIsVisible] = useState(true)

  const { data: vacancies = [], isLoading } = useQuery(
    ["project-vacancies", +params.id, isVisible],
    () =>
      $api
        .get<IVacancy[]>(`positions/projects`, {
          params: { projectId: params.id, isVisible: isVisible },
        })
        .then((res) => res.data)
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <Button
            variant={"outline"}
            onClick={() => setIsVisible(true)}
            disabled={isVisible}
          >
            Только активные
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setIsVisible(false)}
            disabled={!isVisible}
          >
            Только выключенные
          </Button>
        </div>
        <Button variant={"main"}>
          <Link href={`/project/${params.id}/vacancies/create`}>
            Создать новую вакансию
          </Link>
        </Button>
      </div>
      {isLoading ? (
        <>
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </>
      ) : vacancies.length ? (
        vacancies.map((vacancy) => <VacancyCard {...vacancy} />)
      ) : (
        <p>
          {isVisible ? "Нет активных вакансий" : "Нет отключенных вакансий"}
        </p>
      )}
    </div>
  )
}
