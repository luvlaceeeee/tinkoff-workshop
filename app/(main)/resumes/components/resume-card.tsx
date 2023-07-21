import Link from "next/link"

import { LinkTitle } from "@/components/link-title"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { Button } from "@/components/ui/button"
import { convertDate } from "@/lib/convertDate"
import { IResume } from "@/types/interfaces/IResume"

import { useChangeResumeActivity } from "../hooks/useChangeResumeActivity"
import { ChangeResumeDialog } from "./change-resume-dialog"
import { DeleteResumeDialog } from "./delete-resume-dialog"

export function ResumeCard(props: IResume) {
  const { direction, isActive, createdWhen, skills, description, id } = props

  const queries = new URLSearchParams()
  queries.set("skills", [...skills].join(","))
  queries.set("direction", direction.directionName)

  const { mutate, isLoading } = useChangeResumeActivity(
    id,
    direction.description
  )

  return (
    <div className="flex w-full flex-col gap-3 rounded-3xl border p-3 px-5">
      <header className="flex items-center justify-between border-b pb-3">
        <div>
          <LinkTitle href={`/resume/${id}`} className="text-2xl font-semibold">
            {direction.description}
          </LinkTitle>
          <p className="ml-3 inline-block text-sm text-muted-foreground">
            Создан: {convertDate(createdWhen)}
          </p>
        </div>

        {isActive ? (
          <span className="text-xl text-accept">Активное</span>
        ) : (
          <span className="text-xl text-destructive">Отключено</span>
        )}
      </header>

      <SkillsSection
        skills={skills}
        titleSize="text-xl"
        className="space-y-1"
      />

      <AboutSection
        title="Описание"
        description={description}
        titleSize="text-xl"
        className="space-y-1"
      />

      <section className="flex justify-end gap-3 border-t pt-3">
        <DeleteResumeDialog id={id} direction={direction.description} />
        <Button variant={"outline"}>
          <Link href={"/search/vacancies" + `?${queries.toString()}`}>
            Найти подходящие вакансии
          </Link>
        </Button>
        <Button
          variant={"outline"}
          loading={isLoading}
          disabled={isLoading}
          onClick={() => mutate()}
        >
          {isActive ? "Отключить резюме" : "Сделать активным"}
        </Button>
        <ChangeResumeDialog {...props} />
        {/* {isActive && ( */}
          <Button variant={"main"}>
            <Link href={`resumes/${id}/requests`}>Посмотреть запросы</Link>
          </Button>
        {/* )} */}
      </section>
    </div>
  )
}
