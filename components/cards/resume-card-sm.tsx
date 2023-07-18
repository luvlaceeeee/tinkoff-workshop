import { HTMLAttributes } from "react"

import { IResume } from "@/types/interfaces/IResume"
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

type ResumeCardSmallProps = Omit<HTMLAttributes<HTMLDivElement>, "id"> &
  Pick<
    IResume,
    "description" | "direction" | "skills" | "createdWhen" | "id"
  > & { trimCount?: number }

export function ResumeCardSmall(props: ResumeCardSmallProps): JSX.Element {
  const {
    createdWhen,
    description,
    direction,
    skills,
    id,
    className,
    trimCount = 40,
    ...rest
  } = props

  return (
    <Card className={cn("rounded-2xl", className)} {...rest}>
      <CardHeader className="pb-1.5">
        <div>
          <CardTitle>
            <LinkTitle href={`/resume/${id}`} className="text-2xl">
              {direction.description}
            </LinkTitle>
          </CardTitle>
          <CardDescription>{convertDate(createdWhen)}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <label className="text-xs text-muted-foreground">Описание:</label>
        {description && description.trim() ? (
          <p className="break-normal">
            {trimLine(description.trim(), trimCount)}
          </p>
        ) : (
          <p className="text-sm">Отсутствует</p>
        )}
      </CardContent>

      <CardFooter className="flex-col flex-wrap items-start gap-1">
        <label className="text-xs text-muted-foreground">Навыки: </label>
        {skills.length ? (
          <div className="flex flex-wrap items-center gap-2">
            {skills.slice(0, 3).map((skill) => (
              <SkillBadge skill={skill} />
            ))}
            {skills.length - 3 > 0 && (
              <p className="rounded-xl border p-2 px-3 text-sm text-muted-foreground">
                +{skills.length - 3}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm">Отсутствуют</p>
        )}
      </CardFooter>
    </Card>
  )
}
