"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import $api from "@/config/axios"
import { Button } from "@/components/ui/button"
import { ResumeCardSmall } from "@/components/cards/resume-card-sm"

import { resumesMockMany } from "../../profile/config/mock"

export function MainResumes() {
  const { data } = useQuery(["test"], () => $api.get("/requests"))
  return (
    <section className="space-y-3">
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold transition-colors">
          Недавние Резюме
        </h2>
        <div className="space-x-3">
          <Button variant={"main"}>Создать резюме</Button>
          <Button variant={"secondary"}>Смотреть все</Button>
        </div>
      </div>
      {/* BUG next 13 bug */}
      {/* <Suspense fallback={<div>Loading</div>}>
        <MainResumeCarousel />
      </Suspense> */}
      <div className="scrollbar flex snap-x gap-5 overflow-x-auto pb-3">
        {resumesMockMany.map(
          ({ description, direction, skills, createWhen, id }) => (
            <ResumeCardSmall
              className="max-w-sm shrink-0 snap-center"
              direction={direction}
              createWhen={createWhen}
              description={description}
              skills={skills}
              id={id}
            />
          )
        )}
        <Link href={"/searchResume"} className="w-full max-w-sm shrink-0">
          <div className="flex h-full items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground/50 transition-colors hover:bg-muted hover:text-muted-foreground">
            <p className="font-semibold">Смотреть все резюме</p>
          </div>
        </Link>
      </div>
    </section>
  )
}
