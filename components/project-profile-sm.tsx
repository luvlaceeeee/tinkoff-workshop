import Link from "next/link"

import { IProject } from "@/types/interfaces/IProject"
import { convertDate } from "@/lib/convertDate"
import { statusMap } from "@/lib/statusMap"

import { LinkTitle } from "./link-title"
import { AboutSection } from "./sections/about-section"
import { Badge } from "./ui/badge"

type ProjectProfileSmallProps = IProject

export function ProjectProfileSmall(props: ProjectProfileSmallProps) {
  const { title, status, createdWhen, id, theme, description } = props
  return (
    <div className="flex cursor-pointer justify-start  gap-5 rounded-xl border bg-secondary/20 p-5 hover:bg-secondary/30">
      <Link href={`/project/${id}`}>
        <div className="flex flex-col gap-3">
          <section>
            <LinkTitle
              href={`/project/${id}`}
              className="text-2xl font-semibold md:text-3xl"
            >
              {title}
            </LinkTitle>
            <p className="text-xs text-muted-foreground md:text-sm">
              Создан {convertDate(createdWhen)}
            </p>
          </section>

          <section className="space-y-0">
            <h2 className="text-xl font-semibold transition-colors md:text-2xl">
              Статус проекта
            </h2>
            <Badge status={status.statusName}>
              {statusMap(status.description)}
            </Badge>
          </section>

          <AboutSection
            title="Тема проекта"
            description={theme}
            titleSize="text-xl md:text-2xl"
            className="space-y-0"
          />
          <AboutSection
            title="Описание"
            description={description}
            titleSize="text-xl md:text-2xl"
            className="space-y-0"
          />
        </div>
      </Link>
    </div>
  )
}
