import Link from "next/link"

import { IVacancy } from "@/types/interfaces/IVacancy"
import { convertDate } from "@/lib/convertDate"
import { Button } from "@/components/ui/button"
import { LinkTitle } from "@/components/link-title"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { SendRequestToVacancyDialog } from "@/components/send-request-to-vacancy-dialog"

export function VacancySearchCard(props: Omit<IVacancy, "isActive">) {
  const { direction, createdWhen, skills, description, id, project } = props

  return (
    <Link href={`/vacancy/${id}`}>
      <div className="flex h-fit cursor-pointer flex-col gap-3 rounded-3xl border bg-secondary/20 p-3 px-4 hover:bg-secondary/30 md:px-5">
        <section className="flex items-center justify-between border-b pb-2 md:pb-3">
          <div>
            <LinkTitle
              href={`/vacancy/${id}`}
              className="text-xl font-semibold md:text-2xl"
            >
              {direction.description}
            </LinkTitle>
            <LinkTitle
              href={`/project/${project.id}`}
              className="block text-sm font-normal md:text-base"
            >
              {project.title}
            </LinkTitle>
          </div>
          <p className="ml-3 inline-block text-xs text-muted-foreground md:text-sm">
            Создан: {convertDate(createdWhen)}
          </p>
        </section>

        <SkillsSection
          skills={skills}
          titleSize="text-lg md:text-xl"
          className="space-y-0 md:space-y-1"
          isCard
        />

        <AboutSection
          title={"Описание"}
          description={description}
          titleSize="text-lg md:text-xl"
          className="space-y-0 md:space-y-1"
        />

        <section className="flex items-center justify-end gap-3 border-t pt-3">
          <Link href={`/vacancy/${id}`}>
            <Button variant={"outline"} size={"sm"} className="bg-secondary/20">
              Узнать подробнее
            </Button>
          </Link>
          <SendRequestToVacancyDialog vacancyId={id} />
        </section>
      </div>
    </Link>
  )
}
