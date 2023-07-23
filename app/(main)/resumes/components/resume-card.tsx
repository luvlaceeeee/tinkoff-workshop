import Link from "next/link"

import { IResume } from "@/types/interfaces/IResume"
import { convertDate } from "@/lib/convertDate"
import { Button } from "@/components/ui/button"
import { LinkTitle } from "@/components/link-title"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"

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
    <div className="flex w-full flex-col gap-3 rounded-3xl border bg-secondary/20 p-3 px-5">
      {/* <Link href={`/resume/${id}`} className="cursor-pointer"> */}
      <header className="flex items-center justify-between gap-2 border-b pb-2 md:pb-3">
        <div>
          <LinkTitle
            href={`/resume/${id}`}
            className="text-xl font-semibold md:text-2xl"
          >
            {direction.description}
          </LinkTitle>
          <p className="inline-block text-xs text-muted-foreground md:ml-3 md:text-sm">
            Создан: {convertDate(createdWhen)}
          </p>
        </div>

        {isActive ? (
          <span className="text-base text-accept md:text-xl">Активное</span>
        ) : (
          <span className="text-base text-destructive md:text-xl">
            Отключено
          </span>
        )}
      </header>

      <SkillsSection
        skills={skills}
        titleSize="text-lg md:text-xl"
        className="space-y-0 md:space-y-1"
        isCard
      />

      <AboutSection
        title="Описание"
        description={description}
        titleSize="text-lg md:text-xl"
        className="space-y-0 md:space-y-1"
      />
      {/* </Link> */}

      <section className="flex flex-col justify-end gap-3 border-t pt-3 md:flex-row">
        <DeleteResumeDialog id={id} direction={direction.description} />
        <Link href={"/search/vacancies" + `?${queries.toString()}`}>
          <Button
            variant={"outline"}
            className="w-full bg-secondary/20 md:w-fit"
          >
            Найти подходящие вакансии
          </Button>
        </Link>
        <Button
          variant={"outline"}
          loading={isLoading}
          disabled={isLoading}
          onClick={() => mutate()}
          className="bg-secondary/20"
        >
          {isActive ? "Отключить резюме" : "Сделать активным"}
        </Button>
        <ChangeResumeDialog {...props} />
        {/* {isActive && ( */}
        <Link href={`resumes/${id}/requests`}>
          <Button variant={"main"} className="w-full md:w-fit">
            Посмотреть запросы
          </Button>
        </Link>
        {/* )} */}
      </section>
    </div>
  )
}
