import { HTMLAttributes } from "react"
import Link from "next/link"

import { IProject } from "@/types/interfaces/IProject"
import { trimLine } from "@/lib/trimLine"
import { cn } from "@/lib/utils"

import { Badge } from "../ui/badge"
import { buttonVariants } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

type ProjectCardSmallProps = Omit<HTMLAttributes<HTMLDivElement>, "id"> &
  Pick<IProject, "title" | "theme" | "status" | "description" | "id">

export function ProjectCardSmall(props: ProjectCardSmallProps): JSX.Element {
  const { title, theme, status, description, id, className, ...rest } = props

  return (
    <Card className={cn("rounded-2xl", className)} {...rest}>
      <CardHeader>
        <div>
          <CardTitle>
            <Link
              href={`/resume/${id}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "h-fit p-0 text-2xl"
              )}
            >
              {title}
            </Link>
          </CardTitle>
          <CardDescription>
            {/* TODO Варн из-за бейджа*/}
            <Badge>{status}</Badge>
          </CardDescription>
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
