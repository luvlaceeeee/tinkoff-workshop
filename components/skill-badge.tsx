import { HTMLAttributes } from "react"

import { skillMap } from "@/lib/skillMap"
import { cn } from "@/lib/utils"

interface SkillBadgeProps extends HTMLAttributes<HTMLParagraphElement> {
  skill: string
}

export function SkillBadge({ skill, className, ...props }: SkillBadgeProps) {
  return (
    <p
      className={cn("rounded-xl border p-2 px-3 text-sm", className)}
      {...props}
    >
      {skillMap(skill)}
    </p>
  )
}
