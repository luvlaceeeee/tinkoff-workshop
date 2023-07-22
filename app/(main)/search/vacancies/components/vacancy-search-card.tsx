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
    <div className="flex h-fit flex-col gap-3 rounded-3xl border p-3 px-5">
      <section className="flex items-center justify-between border-b pb-3">
        <div>
          <LinkTitle href={`/vacancy/${id}`} className="text-2xl font-semibold">
            {direction.description}
          </LinkTitle>
          <LinkTitle
            href={`/project/${project.id}`}
            className="block text-base font-normal"
          >
            {project.title}
          </LinkTitle>
        </div>
        <p className="ml-3 inline-block text-sm text-muted-foreground">
          Создан: {convertDate(createdWhen)}
        </p>
      </section>

      <SkillsSection
        skills={skills}
        titleSize="text-xl"
        className="space-y-1"
        isCard
      />

      <AboutSection
        title={"Описание"}
        description={description}
        titleSize="text-xl"
        className="space-y-1"
      />

      <section className="flex items-center justify-end gap-3 border-t pt-3">
        <Button variant={"outline"}>
          <Link href={`/vacancy/${id}`}>Узнать подробнее</Link>
        </Button>
        <SendRequestToVacancyDialog vacancyId={id} />
      </section>
    </div>
  )
}
