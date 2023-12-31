import { HTMLAttributes } from "react"
import Link from "next/link"

import { IResume } from "@/types/interfaces/IResume"
import { convertDate } from "@/lib/convertDate"
import { generateKey } from "@/lib/generateKey"
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
    <Link href={`/resume/${id}`}>
      <Card
        className={cn(
          "cursor-pointer rounded-2xl bg-secondary/20 hover:bg-secondary/30",
          className
        )}
        {...rest}
      >
        <CardHeader className="pb-1 md:pb-2">
          <div>
            <CardTitle>
              <LinkTitle href={`/resume/${id}`} className="text-xl md:text-2xl">
                {direction.description}
              </LinkTitle>
            </CardTitle>
            <CardDescription>{convertDate(createdWhen)}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pb-2 md:pb-3">
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
          <label className="text-xs text-muted-foreground">Навыки:</label>
          {skills.length ? (
            <div className="flex flex-wrap items-center gap-2">
              {skills.slice(0, 3).map((skill) => (
                <SkillBadge skill={skill} key={generateKey("skill-badge")} />
              ))}

              {skills.length - 3 > 0 && (
                <p className="rounded-lg border p-1 px-1.5 text-xs text-muted-foreground md:rounded-xl md:p-2 md:px-3 md:text-sm">
                  +{skills.length - 3}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm">Отсутствуют</p>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
