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
  Pick<IVacancy, "description" | "direction" | "skills" | "createWhen" | "id">

export function VacancyCardSmall(props: VacancyCardSmallProps) {
  const { createWhen, description, direction, skills, id, className, ...rest } =
    props
  const skillsString = skills.slice(0, 4).join(", ")

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
              {direction}
            </Link>
          </CardTitle>
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
