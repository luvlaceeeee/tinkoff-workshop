import Link from "next/link"

import { IResume } from "@/types/interfaces/IResume"
import { concatStrings } from "@/lib/concatStrings"
import { convertDate } from "@/lib/convertDate"
import { Button } from "@/components/ui/button"
import { LinkTitle } from "@/components/link-title"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"

export function ResumeSearchCard(props: Omit<IResume, "isActive">) {
  const { direction, createdWhen, skills, description, id, user } = props

  return (
    <div className="flex h-fit flex-col gap-3 rounded-3xl border p-3 px-5">
      <section className="flex items-center justify-between border-b pb-3">
        <div>
          <LinkTitle href={`/resume/${id}`} className="text-2xl font-semibold">
            {direction.description}
          </LinkTitle>
          <LinkTitle
            href={`/profile/${user.id}`}
            className="block text-base font-normal"
          >
            {concatStrings(" ", user.name, user.surname)}
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
      />

      <AboutSection
        title={"Описание"}
        description={description}
        titleSize="text-xl"
        className="space-y-1"
      />

      <section className="flex items-center justify-end gap-3 border-t pt-3">
        <Button variant={"outline"}>
          <Link href={`/resume/${id}`}>Узнать подробнее</Link>
        </Button>
        <Button variant={"main"}>Отправить запрос</Button>
      </section>
    </div>
  )
}
