import { HTMLAttributes, ReactNode } from "react"

import { IProject } from "@/types/interfaces/IProject"
import { trimLine } from "@/lib/trimLine"
import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

type ProjectCardSmallProps = HTMLAttributes<HTMLDivElement> &
  Pick<IProject, "title" | "theme" | "status" | "description">

export default function ProjectCardSmall(
  props: ProjectCardSmallProps
): ReactNode {
  const { title, theme, status, description, className, ...rest } = props

  return (
    <Card className={cn("rounded-2xl", className)} {...rest}>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{status}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{trimLine(description, 60)}</p>
      </CardContent>
      <CardFooter>
        <p>{trimLine(theme, 30)}</p>
      </CardFooter>
    </Card>
  )
}
