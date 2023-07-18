"use client"

import { Fragment } from "react"

import { generateKey } from "@/lib/generateKey"
import { Skeleton } from "@/components/ui/skeleton"

import { ResumeCard } from "./components/resume-card"
import { useUserResumes } from "./hooks/useUserResumes"

function ResumesPage() {
  const { data: resumes = [], isLoading } = useUserResumes()

  if (isLoading)
    return (
      <div className="space-y-4">
        {[...new Array(2)].map(() => (
          <Skeleton
            key={generateKey("skeleton")}
            className="h-60 w-full rounded-2xl"
          />
        ))}
      </div>
    )

  return resumes.length ? (
    <div className="space-y-4">
      {resumes.map((resume) => (
        <Fragment key={resume.id}>
          <ResumeCard {...resume} />
        </Fragment>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center gap-3">
      <p className="text-muted-foreground">У вас нет ни одного резюме</p>
      {/* <Button variant={"secondary"} asChild className="text-xl">
        <Link href={"/create/resume"}>Создать резюме</Link>
      </Button> */}
    </div>
  )
}

export default ResumesPage
