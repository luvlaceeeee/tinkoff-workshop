import { HTMLAttributes } from "react"
import Link from "next/link"
import dayjs from "dayjs"

import { IVacancy } from "@/types/interfaces/IVacancy"
import { trimLine } from "@/lib/trimLine"
import { cn } from "@/lib/utils"

import { buttonVariants } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

type VacancyCardSmallProps = Omit<HTMLAttributes<HTMLDivElement>, "id"> &
  Pick<
    IVacancy,
    "description" | "direction" | "id" | "project" | "skills" | "createdWhen"
  >

export function VacancyCardSmall(props: VacancyCardSmallProps) {
  const {
    createdWhen,
    description,
    direction,
    skills,
    id,
    project,
    className,
    ...rest
  } = props

  const skillsString = skills.slice(0, 4).join(", ")

  return (
    <Card className={cn("rounded-2xl", className)} {...rest}>
      <CardHeader className="pb-3">
        <div>
          <CardTitle>
            <Link
              href={`/vacancy/${id}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "h-fit p-0 text-2xl"
              )}
            >
              {direction.description}
            </Link>
          </CardTitle>
          <CardDescription>
            {dayjs.unix(createdWhen).format("DD.MM.YYYY в HH:mm")}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <label className="text-xs text-muted-foreground">Навыки:</label>
        <p>{trimLine(skillsString, 30)}</p>
        <label className="text-xs text-muted-foreground">Описание:</label>
        <p>{trimLine(description, 60)}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/project/${project.id}`}
          className={cn(
            buttonVariants({ variant: "link" }),
            "h-fit p-0 text-2xl"
          )}
        >
          <p className="text-sm">{project.title}</p>
        </Link>
      </CardFooter>
    </Card>
  )
}
