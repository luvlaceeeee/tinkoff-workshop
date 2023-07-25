"use client"

import { Fragment, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ReactPaginate from "react-paginate"

import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { useRouting } from "../../hooks/useRouting"
import { IResumesSearchResponse } from "../types/IResumesSearchResponse"
import { ResumeSearchCard } from "./resume-search-card"

export function SearchResumesContent() {
  const [router, pathname, searchParams] = useRouting()

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

  const handleCurrentPage = (pageNumber: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set("page", String(pageNumber))

    if (!isPreviousData) {
      router.push(pathname + `?${current.toString()}`)
    }
  }

  //@ts-ignore
  const onPageChange = (event) => {
    handleCurrentPage(event.selected + 1)
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

  if (!resumes.content.length) {
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
        {resumes.content.map((resume) => (
          <Fragment key={resume.id}>
            <ResumeSearchCard {...resume} />
          </Fragment>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        <ReactPaginate
          breakLabel="..."
          initialPage={page}
          onPageChange={onPageChange}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={resumes.pageCount}
          nextLabel={<ChevronRight />}
          previousLabel={<ChevronLeft />}
          renderOnZeroPageCount={null}
          className="flex gap-2"
          activeClassName={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "bg-secondary"
          )}
          pageLinkClassName={cn(
            buttonVariants({ variant: "outline", size: "icon" })
          )}
          previousClassName={buttonVariants({ size: "icon" })}
          nextClassName={buttonVariants({ size: "icon" })}
        />
      </div>
    </>
  )
}
