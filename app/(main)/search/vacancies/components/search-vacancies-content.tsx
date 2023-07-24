"use client"

import { Fragment, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft, ChevronRight } from "lucide-react"

import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { useRouting } from "../../hooks/useRouting"
import { IVacancySearchResponse } from "../types/IVacancySearchResponse"
import { VacancySearchCard } from "./vacancy-search-card"

export function SearchVacanciesContent() {
  const [router, pathname, searchParams] = useRouting()

  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState<string | null>(null)
  const [dateSort, setDateSort] = useState<"ASC" | "DESC" | null>(null)
  const [skills, setSkills] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    //@ts-ignore
    if (searchParams.get("page") <= 0 && searchParams.get("page") !== null)
      notFound()

    setPage(
      //@ts-ignore
      searchParams.get("page") !== null ? searchParams.get("page") - 1 : 0
    )

    setDirection(searchParams.get("direction"))
    //@ts-ignore
    setDateSort(searchParams.get("dateSort"))
    //@ts-ignore
    setSkills(searchParams.get("skills"))
    //@ts-ignore
    setStatus(searchParams.get("status"))
  }, [searchParams])

  const {
    data: vacancies = { content: [], pageCount: 0 },
    isLoading,
    isPreviousData,
  } = useQuery(
    ["vacancies", page, direction, dateSort, skills, status],
    () =>
      $api
        .get<IVacancySearchResponse>("positions/search", {
          params: {
            page,
            size: 4,
            direction,
            dateSort,
            skills,
            status,
          },
        })
        .then((res) => res.data),
    { keepPreviousData: true }
  )

  const handleNextPage = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set("page", String(page + 2))

    if (!isPreviousData) {
      router.push(pathname + `?${current.toString()}`)
    }
  }

  const handlePrevPage = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set("page", String(page))

    router.push(pathname + `?${current.toString()}`)
  }

  const handleCurrentPage = (pageNumber: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set("page", String(pageNumber))

    if (!isPreviousData) {
      router.push(pathname + `?${current.toString()}`)
    }
  }

  if (isLoading)
    return (
      <div className="grid gap-5 md:grid-cols-2">
        {[...new Array(4)].map(() => (
          <Skeleton
            key={generateKey("skeleton")}
            className="h-80 w-full rounded-2xl"
          />
        ))}
      </div>
    )

  if (!vacancies.content.length) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-muted-foreground">Ничего не найдено</p>
        <Button onClick={() => router.back()}>Назад</Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {vacancies.content.map((resume) => (
          <Fragment key={resume.id}>
            <VacancySearchCard {...resume} />
          </Fragment>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={handlePrevPage}
          disabled={page === 0 || isPreviousData}
          size={"icon"}
        >
          <ChevronLeft />
        </Button>
        <div className="flex items-center gap-2">
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => handleCurrentPage(1)}
            className={page === 0 ? "bg-secondary" : ""}
          >
            {1}
          </Button>

          {[...new Array(vacancies.pageCount)].map((_, i) => {
            if (i === 0 || i === vacancies.pageCount - 1) return
            return (
              <Button
                key={generateKey("paginate-button")}
                size={"icon"}
                variant={"outline"}
                onClick={() => handleCurrentPage(i + 1)}
                className={page === i ? "bg-secondary" : ""}
              >
                {i + 1}
              </Button>
            )
          })}
          {vacancies.pageCount !== 1 && (
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={() => handleCurrentPage(vacancies.pageCount)}
              className={page === vacancies.pageCount - 1 ? "bg-secondary" : ""}
            >
              {vacancies.pageCount}
            </Button>
          )}
        </div>
        <Button
          size={"icon"}
          onClick={handleNextPage}
          disabled={isPreviousData || page + 1 === vacancies.pageCount}
        >
          <ChevronRight />
        </Button>
      </div>
    </>
  )
}
