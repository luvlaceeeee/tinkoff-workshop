import Link from "next/link"
import dayjs from "dayjs"

import { IResume } from "@/types/interfaces/IResume"
import { generateKey } from "@/lib/generateKey"
import { skillMap } from "@/lib/skillMap"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

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
            Создан: {dayjs.unix(createdWhen).format("DD.MM.YYYY в HH:mm")}
          </p>
        </div>

        {isActive ? (
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
        {/* <Button variant={"destructive"}>Удалить резюме</Button> */}
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
