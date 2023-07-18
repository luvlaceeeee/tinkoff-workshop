import Link from "next/link"

import { IVacancy } from "@/types/interfaces/IVacancy"
import { convertDate } from "@/lib/convertDate"
import { generateKey } from "@/lib/generateKey"
import { skillMap } from "@/lib/skillMap"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

import { DeleteVacancyDialog } from "./delete-vacancy-dialog"

export function VacancyCard(props: IVacancy) {
  const { createdWhen, description, direction, id, isVisible, skills } = props
  return (
    <div className="flex w-full flex-col gap-3 rounded-3xl border p-3 px-5">
      <section className="flex items-center justify-between border-b pb-3">
        <div>
          <h1
            className={cn(
              buttonVariants({ variant: "link" }),
              "h-fit p-0 text-2xl font-semibold"
            )}
          >
            <Link href={`/resume/${id}`}>{direction.description}</Link>
          </h1>
          <p className="ml-3 inline-block text-sm text-muted-foreground">
            Создан: {convertDate(createdWhen)}
          </p>
        </div>

        {isVisible ? (
          <span className="text-xl text-accept">Активное</span>
        ) : (
          <span className="text-xl text-destructive">Отключено</span>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight transition-colors">
          Навыки
        </h2>
        <div className="flex gap-2 pt-1">
          {skills.map((skill) => (
            <p
              key={generateKey(skill)}
              className="rounded-xl border p-2 px-3 text-sm"
            >
              {skillMap(skill)}
            </p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight transition-colors">
          Описание
        </h2>
        {description ? (
          <p className="pt-1">{description}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Отсутствует</p>
        )}
      </section>

      <section className="flex justify-end gap-3 border-t pt-3">
        <DeleteVacancyDialog
          id={id}
          direction={direction.description}
          projectId={6}
        />
        <Button variant={"main"}>Посмотреть запросы</Button>
      </section>
    </div>
  )
}
