import Link from "next/link"

import { Button } from "@/components/ui/button"

import { MainResumeCarousel } from "./main-resume-carousel"

export function MainResumes() {
  return (
    <section className="space-y-3">
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold transition-colors">
          Недавние Резюме
        </h2>
        <div className="space-x-3">
          <Button variant={"main"} asChild>
            <Link href={"/create/resume"}>Создать резюме</Link>
          </Button>
          <Button variant={"secondary"} asChild>
            <Link href={"/search/resumes"}>Смотреть все резюме</Link>
          </Button>
        </div>
      </div>
      <MainResumeCarousel />
    </section>
  )
}
