import Link from "next/link"
import dayjs from "dayjs"

import { IResume } from "@/types/interfaces/IResume"
import { concatStrings } from "@/lib/concatStrings"
import { generateKey } from "@/lib/generateKey"
import { skillMap } from "@/lib/skillMap"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export function ResumeSearchCard(props: Omit<IResume, "isActive">) {
  const { direction, createdWhen, skills, description, id, user } = props

  return (
    <div className="flex h-fit flex-col gap-3 rounded-3xl border p-3 px-5">
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

          <h2
            className={cn(
              buttonVariants({ variant: "link" }),
              "block h-fit p-0 text-base font-normal"
            )}
          >
            <Link href={`/profile/${user.id}`}>
              {concatStrings(" ", user.name, user.surname)}
            </Link>
          </h2>
        </div>
        <p className="ml-3 inline-block text-sm text-muted-foreground">
          Создан: {dayjs.unix(createdWhen).format("DD.MM.YYYY в HH:mm")}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight transition-colors">
          Навыки
        </h2>
        <div className="flex flex-wrap gap-2 pt-1">
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

      <section className="flex items-center justify-end gap-3 border-t pt-3">
        <Button variant={"outline"}>
          <Link href={`/resume/${id}`}>Узнать подробнее</Link>
        </Button>
        <Button variant={"main"}>Отправить запрос</Button>
      </section>
    </div>
  )
}
