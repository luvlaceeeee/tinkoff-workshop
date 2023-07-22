import { HTMLAttributes } from "react"

import { skillMap } from "@/lib/skillMap"
import { cn } from "@/lib/utils"

interface SkillBadgeProps extends HTMLAttributes<HTMLParagraphElement> {
  skill: string
}

export function SkillBadge({ skill, className, ...props }: SkillBadgeProps) {
  return (
    <p
      className={cn(
        "rounded-lg border p-1 px-1.5 text-xs md:rounded-xl md:p-2 md:px-3 md:text-sm ",
        className
      )}
      {...props}
    >
      {skillMap(skill)}
    </p>
  )
}
