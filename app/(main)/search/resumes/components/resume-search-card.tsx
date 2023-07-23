import Link from "next/link"

import { IResume } from "@/types/interfaces/IResume"
import { concatStrings } from "@/lib/concatStrings"
import { convertDate } from "@/lib/convertDate"
import { Button } from "@/components/ui/button"
import { LinkTitle } from "@/components/link-title"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { SendRequestToResumeDialog } from "@/components/send-request-to-resume-dialog"

export function ResumeSearchCard(props: Omit<IResume, "isActive">) {
  const { direction, createdWhen, skills, description, id, user } = props

  return (
    <div className="flex h-fit flex-col gap-2 rounded-3xl border p-3 px-4 md:px-5">
      <section className="flex items-center justify-between border-b pb-2 md:pb-3">
        <div className="">
          <LinkTitle
            href={`/resume/${id}`}
            className="text-xl font-semibold md:text-2xl"
          >
            {direction.description}
          </LinkTitle>
          <LinkTitle
            href={`/profile/${user.id}`}
            className="block text-sm font-normal md:text-base"
          >
            {concatStrings(" ", user.name, user.surname)}
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
        <Link href={`/resume/${id}`}>
          <Button variant={"outline"} size={"sm"}>
            Узнать подробнее
          </Button>
        </Link>
        <SendRequestToResumeDialog resumeId={id} />
      </section>
    </div>
  )
}
