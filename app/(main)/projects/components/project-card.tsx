import Link from "next/link"

import { IProject } from "@/types/interfaces/IProject"
import { convertDate } from "@/lib/convertDate"
import { statusMap } from "@/lib/statusMap"
import { trimLine } from "@/lib/trimLine"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LinkTitle } from "@/components/link-title"
import { AboutSection } from "@/components/sections/about-section"

export function ProjectCard(
  props: Omit<
    IProject,
    "isLeader" | "members" | "vacanciesCount" | "contacts" | "description"
  >
) {
  const { title, theme, membersCount, status, createdWhen, id } = props

  return (
    <div className="flex w-full flex-col gap-2 rounded-3xl border p-3 px-4 md:gap-3 md:px-5">
      <section className="flex items-center justify-between border-b pb-3">
        <div>
          <LinkTitle
            href={`/project/${id}`}
            className="text-xl font-semibold md:text-2xl"
          >
            {title}
          </LinkTitle>
          <p className="text-xs text-muted-foreground md:text-sm">
            Создан: {convertDate(createdWhen)}
          </p>
        </div>
      </section>

      <AboutSection
        title="Тема проекта"
        description={trimLine(theme, 80)!}
        titleSize="text-lg md:text-xl"
        className="space-y-0 md:space-y-1"
      />

      <section className="space-x-1 md:space-x-2">
        <h2 className="inline-block text-lg font-semibold tracking-tight transition-colors md:text-xl">
          Количество участников:
        </h2>
        <p className="inline-block">{membersCount}</p>
      </section>

      <section className="space-x-2">
        <h2 className="inline-block text-lg font-semibold tracking-tight transition-colors md:text-xl">
          Статус:
        </h2>
        <p className="inline-block">
          <Badge status={status.statusName}>
            {statusMap(status.description)}
          </Badge>
        </p>
      </section>

      <section>
        <Link href={`/project/${id}`} className="w-full">
          <Button variant={"main"} className="w-full">
            Открыть
          </Button>
        </Link>
      </section>
    </div>
  )
}
