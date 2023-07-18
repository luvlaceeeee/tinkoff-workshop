import { IProject } from "@/types/interfaces/IProject"
import { convertDate } from "@/lib/convertDate"

import { LinkTitle } from "./link-title"
import { AboutSection } from "./sections/about-section"

type ProjectProfileSmallProps = IProject

export function ProjectProfileSmall(props: ProjectProfileSmallProps) {
  const { title, status, createdWhen, id, theme, description } = props
  return (
    <div className="flex justify-start gap-5">
      <div className="flex flex-col gap-3">
        <section>
          <LinkTitle href={`/project/${id}`} className="text-3xl font-semibold">
            {title}
          </LinkTitle>
          <p className="text-sm text-muted-foreground">
            {convertDate(createdWhen)}
          </p>
        </section>

        <section className="space-y-0">
          <h2 className="text-2xl font-semibold transition-colors">
            Статус проекта
          </h2>
          <p>{status.description}</p>
        </section>

        <AboutSection
          title="Тема проекта"
          description={theme}
          titleSize="text-2xl"
          className="space-y-0"
        />
        <AboutSection
          title="Описание"
          description={description}
          titleSize="text-2xl"
          className="space-y-0"
        />
      </div>
    </div>
  )
}
