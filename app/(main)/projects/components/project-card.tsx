import Link from "next/link"

import { IProject } from "@/types/interfaces/IProject"
import { convertDate } from "@/lib/convertDate"
import { statusMap } from "@/lib/statusMap"
import { trimLine } from "@/lib/trimLine"
import { Button } from "@/components/ui/button"
import { LinkTitle } from "@/components/link-title"

export function ProjectCard(
  props: Omit<
    IProject,
    "isLeader" | "members" | "vacanciesCount" | "contacts" | "description"
  >
) {
  const { title, theme, membersCount, status, createdWhen, id } = props
  return (
    <div className="flex w-full flex-col gap-3 rounded-3xl border p-3 px-5">
      <section className="flex items-center justify-between border-b pb-3">
        <div>
          <LinkTitle href={`/project/${id}`} className="text-2xl">
            {title}
          </LinkTitle>
          <p className="text-sm text-muted-foreground">
            Создан: {convertDate(createdWhen)}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight transition-colors">
          Тема проекта
        </h2>
        {true ? (
          <p className="pt-1">{trimLine(theme, 80)}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Отсутствует</p>
        )}
      </section>

      <section className="space-x-2">
        <h2 className="inline-block text-xl font-semibold tracking-tight transition-colors">
          Количество участников:
        </h2>
        <p className="inline-block pt-1">{membersCount}</p>
      </section>

      <section className="space-x-2">
        <h2 className="inline-block text-xl font-semibold tracking-tight transition-colors">
          Статус:
        </h2>
        <p className="inline-block pt-1">{statusMap(status.description)}</p>
      </section>

      <section className="mx-auto">
        <Button variant={"main"}>
          <Link href={`/project/${id}`}>Открыть</Link>
        </Button>
      </section>
    </div>
  )
}
