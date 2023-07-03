import { HTMLAttributes, ReactNode } from "react"
import dayjs from "dayjs"

import { IResume } from "@/types/interfaces/IResume"
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

type ResumeCardSmallProps = HTMLAttributes<HTMLDivElement> &
  Pick<IResume, "description" | "direction" | "skills" | "createWhen">

export default function ResumeCardSmall(
  props: ResumeCardSmallProps
): ReactNode {
  const { createWhen, description, direction, skills, className, ...rest } =
    props

  const skillsString = skills.slice(0, 4).join(", ")
  return (
    <Card className={cn("rounded-2xl", className)} {...rest}>
      <CardHeader>
        <div>
          <CardTitle>{direction}</CardTitle>
          <CardDescription>
            {dayjs.unix(createWhen).format("DD.MM.YYYY")}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{trimLine(description, 60)}</p>
      </CardContent>
      <CardFooter>
        <p>{trimLine(skillsString, 30)}</p>
      </CardFooter>
    </Card>
  )
}
