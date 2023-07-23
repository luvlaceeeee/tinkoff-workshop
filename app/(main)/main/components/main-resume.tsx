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
          <Link href={"/create/resume"}>
            <Button variant={"main"} size={"sm"}>
              Создать резюме
            </Button>
          </Link>
          <Link href={"/search/resumes"}>
            <Button variant={"secondary"} size={"sm"}>
              Смотреть все резюме
            </Button>
          </Link>
        </div>
      </div>
      <MainResumeCarousel />
    </section>
  )
}
