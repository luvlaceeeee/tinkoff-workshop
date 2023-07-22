import Link from "next/link"

import { Button } from "@/components/ui/button"

import { MainResumeCarousel } from "./main-resume-carousel"

export function MainResumes() {
  return (
    <section className="space-y-3">
      <div className="flex flex-col justify-between gap-1 md:flex-row">
        <h2 className="text-lg font-semibold transition-colors md:text-3xl">
          Недавние Резюме
        </h2>
        <div className="flex justify-between gap-3">
          <Button variant={"main"} size={"sm"}>
            <Link href={"/create/resume"}>Создать резюме</Link>
          </Button>
          <Button variant={"secondary"} size={"sm"}>
            <Link href={"/search/resumes"}>Смотреть все резюме</Link>
          </Button>
        </div>
      </div>
      <MainResumeCarousel />
    </section>
  )
}
