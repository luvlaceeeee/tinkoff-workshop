import { HTMLAttributes } from "react"
import Link from "next/link"
import dayjs from "dayjs"

import { IResume } from "@/types/interfaces/IResume"
import { skillMap } from "@/lib/skillMap"
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

type ResumeCardSmallProps = Omit<HTMLAttributes<HTMLDivElement>, "id"> &
  Pick<IResume, "description" | "direction" | "skills" | "createdWhen" | "id">

export function ResumeCardSmall(props: ResumeCardSmallProps): JSX.Element {
  const {
    createdWhen,
    description,
    direction,
    skills,
    id,
    className,
    ...rest
  } = props

  const skillsString = skills
    ? skills
        .slice(0, 4)
        .map((skill) => skillMap(skill))
        .join(", ")
    : ""

  return (
    <Card className={cn("rounded-2xl", className)} {...rest}>
      <CardHeader className="pb-3">
        <div>
          <CardTitle>
            <Link
              href={`/resume/${id}`}
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
        <label className="text-xs text-muted-foreground">Описание:</label>
        {description && description.trim() ? (
          <p>{trimLine(description.trim(), 100)}</p>
        ) : (
          <p className="text-sm">Отсутствует</p>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start">
        <label className="text-xs text-muted-foreground">Навыки: </label>
        {skillsString ? (
          <p>{trimLine(skillsString, 30)}</p>
        ) : (
          <p className="text-sm">Отсутствуют</p>
        )}
      </CardFooter>
    </Card>
  )
}
