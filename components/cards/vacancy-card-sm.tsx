import { HTMLAttributes } from "react"

import { IVacancy } from "@/types/interfaces/IVacancy"
import { convertDate } from "@/lib/convertDate"
import { skillMap } from "@/lib/skillMap"
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

  const skillsString = skills
    .slice(0, 4)
    .map((skill) => skillMap(skill))
    .join(", ")

  return (
    <Card className={cn("rounded-2xl", className)} {...rest}>
      <CardHeader className="pb-2">
        <div>
          <CardTitle>
            <LinkTitle href={`/vacancy/${id}`} className="text-2xl">
              {" "}
              {direction.description}
            </LinkTitle>
          </CardTitle>
          <CardDescription>{convertDate(createdWhen)}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <label className="text-xs text-muted-foreground">Навыки:</label>
        {skills.length ? (
          <div className="flex flex-wrap items-center gap-2">
            {skills.slice(0, 4).map((skill) => (
              <SkillBadge skill={skill} />
            ))}
            {skills.length - 5 > 0 && (
              <p className="rounded-xl border p-2 px-3 text-sm text-muted-foreground">
                +{skills.length - 5}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm">Отсутствуют</p>
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
