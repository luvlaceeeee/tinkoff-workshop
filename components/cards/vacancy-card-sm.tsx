import { HTMLAttributes } from "react"

import { IVacancy } from "@/types/interfaces/IVacancy"
import { convertDate } from "@/lib/convertDate"
import { trimLine } from "@/lib/trimLine"
import { cn } from "@/lib/utils"

import { LinkTitle } from "../link-title"
import { SkillBadge } from "../skill-badge"
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

  return (
    <Card className={cn("rounded-2xl", className)} {...rest}>
      <CardHeader className="pb-1 md:pb-2">
        <div>
          <CardTitle>
            <LinkTitle href={`/vacancy/${id}`} className="text-xl md:text-2xl">
              {" "}
              {direction.description}
            </LinkTitle>
          </CardTitle>
          <CardDescription>{convertDate(createdWhen)}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-2 md:pb-3">
        <label className="text-xs text-muted-foreground">Навыки:</label>
        {skills.length ? (
          <div className="flex flex-wrap items-center gap-2">
            {skills.slice(0, 4).map((skill) => (
              <SkillBadge skill={skill} />
            ))}
            {skills.length - 5 > 0 && (
              <p className="rounded-lg border p-1 px-1.5 text-xs text-muted-foreground md:rounded-xl md:p-2 md:px-3 md:text-sm">
                +{skills.length - 5}
              </p>
            )}
          </div>
        ) : (
          <p className="text-xs md:text-sm">Отсутствуют</p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <label className="text-xs text-muted-foreground">Описание:</label>
        {description && description.trim() ? (
          <p className="break-normal">{trimLine(description.trim(), 60)}</p>
        ) : (
          <p className="text-sm">Отсутствует</p>
        )}
      </CardFooter>
    </Card>
  )
}
