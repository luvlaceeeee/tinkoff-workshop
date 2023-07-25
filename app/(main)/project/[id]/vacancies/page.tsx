"use client"

import { Fragment, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { IVacancy } from "@/types/interfaces/IVacancy"
import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"
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
        .then((res) => res.data),
    { onError: () => notFound() }
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex justify-between gap-2 md:justify-normal">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => setIsVisible(true)}
            disabled={isVisible}
          >
            Только активные
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => setIsVisible(false)}
            disabled={!isVisible}
          >
            Только выключенные
          </Button>
        </div>
        <Link href={`/project/${params.id}/vacancies/create`}>
          <Button variant={"main"} className="w-full md:w-fit">
            Создать новую вакансию
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <>
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </>
      ) : vacancies.length ? (
        vacancies.map((vacancy) => (
          <Fragment key={generateKey("vacancy-card")}>
            <VacancyCard vacancy={vacancy} projectId={+params.id} />
          </Fragment>
        ))
      ) : (
        <p>
          {isVisible ? "Нет активных вакансий" : "Нет отключенных вакансий"}
        </p>
      )}
    </div>
  )
}
