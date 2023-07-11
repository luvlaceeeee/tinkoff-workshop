"use client"

import { useQuery } from "@tanstack/react-query"

import { IResume } from "@/types/interfaces/IResume"
import $api from "@/config/axios"
import { Skeleton } from "@/components/ui/skeleton"

import { ResumeCard } from "./components/resume-card"

function ResumesPage() {
  const { data: resumes = [], isLoading } = useQuery(["user-resumes"], () =>
    $api.get<IResume[]>("/resumes").then((res) => res.data)
  )

  if (isLoading)
    return (
      <div className="space-y-4">
        {[...new Array(3)].map(() => (
          <Skeleton className="h-60 w-full rounded-2xl" />
        ))}
      </div>
    )

  return resumes.length ? (
    <div className="space-y-4">
      {resumes.map((resume) => (
        <ResumeCard {...resume} />
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
