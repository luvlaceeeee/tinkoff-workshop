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
        <Button variant={"outline"}>Найти подходящие вакансии</Button>
        <Button
          variant={"outline"}
          loading={isLoading}
          disabled={isLoading}
          onClick={() => mutate()}
        >
          {isActive ? "Отключить резюме" : "Сделать активным"}
        </Button>
        <ChangeResumeDialog {...props} />
        <Button variant={"main"}>Посмотреть запросы</Button>
      </section>
    </div>
  )
}
