"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { ResumeCard } from "./components/resume-card"
import { useUserResumes } from "./hooks/useUserResumes"

function ResumesPage() {
  const [isActive, setIsActive] = useState(true)

  const { data: resumes = [], isLoading } = useUserResumes(isActive)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <Button
            variant={"outline"}
            onClick={() => setIsActive(true)}
            disabled={isActive}
          >
            Только активные
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setIsActive(false)}
            disabled={!isActive}
          >
            Только выключенные
          </Button>
        </div>
      </div>
      {isLoading ? (
        <>
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </>
      ) : resumes.length ? (
        resumes.map((resume) => <ResumeCard {...resume} />)
      ) : (
        <p>{isActive ? "Нет активных резюме" : "Нет отключенных резюме"}</p>
      )}
    </div>
  )
}

export default ResumesPage
