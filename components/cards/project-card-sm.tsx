import { HTMLAttributes } from "react"

import { IProject } from "@/types/interfaces/IProject"
import { convertDate } from "@/lib/convertDate"
import { statusMap } from "@/lib/statusMap"
import { trimLine } from "@/lib/trimLine"
import { cn } from "@/lib/utils"

import { LinkTitle } from "../link-title"
import { Badge } from "../ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

type ProjectCardSmallProps = Omit<HTMLAttributes<HTMLDivElement>, "id"> &
  Pick<
    IProject,
    "title" | "description" | "theme" | "status" | "id" | "createdWhen"
  >

export function ProjectCardSmall(props: ProjectCardSmallProps): JSX.Element {
  const {
    title,
    theme,
    status,
    description,
    id,
    className,
    createdWhen,
    ...rest
  } = props

  return (
    <Card className={cn("rounded-2xl", className)} {...rest}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              <LinkTitle href={`/project/${id}`} className="text-2xl">
                {title}
              </LinkTitle>
            </CardTitle>
            <CardDescription>{convertDate(createdWhen)}</CardDescription>
          </div>
          <Badge status={status.statusName}>
            {statusMap(status.description)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <label className="text-xs text-muted-foreground">Тема: </label>
        {theme ? (
          <p>{trimLine(theme, 50)}</p>
        ) : (
          <p className="text-sm">Отсутствует</p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <label className="text-xs text-muted-foreground">Описание: </label>
        {description ? (
          <p>{trimLine(description, 100)}</p>
        ) : (
          <p className="text-sm">Отсутствует</p>
        )}
      </CardFooter>
    </Card>
  )
}
