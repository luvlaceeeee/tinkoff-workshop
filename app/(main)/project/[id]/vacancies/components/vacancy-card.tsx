import Link from "next/link"

import { IVacancy } from "@/types/interfaces/IVacancy"
import { convertDate } from "@/lib/convertDate"
import { Button } from "@/components/ui/button"
import { LinkTitle } from "@/components/link-title"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"

import { useChangeVacancyVisibility } from "../hooks/useChangeVacancyVisibility"
import { ChangeVacancyDialog } from "./change-vacancy-dialog"
import { DeleteVacancyDialog } from "./delete-vacancy-dialog"

export function VacancyCard(props: IVacancy) {
  const { createdWhen, description, direction, id, isVisible, skills } = props

  const queries = new URLSearchParams()
  queries.set("skills", [...skills].join(","))
  queries.set("direction", direction.directionName)

  const { mutate, isLoading } = useChangeVacancyVisibility(
    id,
    direction.description
  )

  return (
    <div className="flex w-full flex-col gap-3 rounded-3xl border p-3 px-5">
      <section className="flex items-center justify-between gap-2 border-b pb-2 md:pb-3">
        <div>
          <LinkTitle href={`/vacancy/${id}`} className="text-xl md:text-2xl">
            {direction.description}
          </LinkTitle>
          <p className="inline-block text-xs text-muted-foreground md:ml-3 md:text-sm">
            Создан: {convertDate(createdWhen)}
          </p>
        </div>

        {isVisible ? (
          <span className="text-base text-accept md:text-xl">Активная</span>
        ) : (
          <span className="text-base text-destructive md:text-xl">
            Отключена
          </span>
        )}
      </section>

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

      <section className="flex flex-col justify-end gap-3 border-t pt-3 md:flex-row">
        <DeleteVacancyDialog
          id={id}
          direction={direction.description}
          projectId={6}
        />
        <Button variant={"outline"}>
          <Link href={"/search/resumes" + `?${queries.toString()}`}>
            Найти подходящие резюме
          </Link>
        </Button>
        <Button
          variant={"outline"}
          loading={isLoading}
          disabled={isLoading}
          onClick={() => mutate()}
        >
          {isVisible ? "Отключить вакансию" : "Сделать активной"}
        </Button>
        <ChangeVacancyDialog {...props} />
        {/* {isVisible && ( */}
        <Button variant={"main"} asChild>
          <Link href={`vacancies/${id}/requests`}>Посмотреть запросы</Link>
        </Button>
        {/* )} */}
      </section>
    </div>
  )
}
