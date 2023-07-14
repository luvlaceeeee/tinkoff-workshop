"use client"

import { Fragment, useEffect, useState } from "react"
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft, ChevronRight } from "lucide-react"

import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { IResumesSearchResponse } from "../types/IResumesSearchResponse"
import { ResumeSearchCard } from "./resume-search-card"

export function SearchResumesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState<string | null>(null)
  const [dateSort, setDateSort] = useState<"ASC" | "DESC" | null>(null)
  const [skills, setSkills] = useState([])

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
  }, [searchParams])

  const {
    data: resumes = { content: [], pageCount: 0 },
    isLoading,
    isPreviousData,
    isFetching,
  } = useQuery(
    ["resumes", page, direction, dateSort, skills],
    () =>
      $api
        .get<IResumesSearchResponse>("resumes/search", {
          params: {
            page,
            size: 4,
            direction,
            dateSort,
            skills,
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
      <div className="grid grid-cols-2 gap-5">
        {[...new Array(4)].map(() => (
          <Skeleton
            key={generateKey("skeleton")}
            className="h-80 w-full rounded-2xl"
          />
        ))}
      </div>
    )

  if (!resumes.content) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-muted-foreground">Ничего не найдено</p>
        <Button onClick={() => router.back()}>Назад</Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        {resumes.content.map((resume) => (
          <Fragment key={resume.id}>
            <ResumeSearchCard {...resume} />
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
          {[...new Array(resumes.pageCount)].map((_, i) => {
            return (
              <Button
                size={"icon"}
                variant={"outline"}
                onClick={() => handleCurrentPage(i + 1)}
                className={page === i ? "bg-secondary" : ""}
              >
                {i + 1}
              </Button>
            )
          })}
        </div>
        <Button
          size={"icon"}
          onClick={handleNextPage}
          disabled={isPreviousData || page + 1 === resumes.pageCount}
          loading={isFetching}
        >
          <ChevronRight />
        </Button>
      </div>
    </>
  )
}
