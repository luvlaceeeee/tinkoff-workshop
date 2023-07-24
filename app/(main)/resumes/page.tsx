"use client"

import { Fragment, useState } from "react"

import { generateKey } from "@/lib/generateKey"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { ResumeCard } from "./components/resume-card"
import { useUserResumes } from "./hooks/useUserResumes"

function ResumesPage() {
  const [isActive, setIsActive] = useState(true)

  const { data: resumes = [], isLoading } = useUserResumes(isActive)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-2 md:justify-start">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setIsActive(true)}
          disabled={isActive}
        >
          Только активные
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setIsActive(false)}
          disabled={!isActive}
        >
          Только неактивные
        </Button>
      </div>
      {isLoading ? (
        <>
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </>
      ) : resumes.length ? (
        resumes.map((resume) => (
          <Fragment key={generateKey("resume-card")}>
            <ResumeCard {...resume} />
          </Fragment>
        ))
      ) : (
        <p>{isActive ? "Нет активных резюме" : "Нет отключенных резюме"}</p>
      )}
    </div>
  )
}

export default ResumesPage
