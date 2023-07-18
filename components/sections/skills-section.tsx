import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

import { SkillBadge } from "../skill-badge"

interface SkillsSectionProps extends HTMLAttributes<HTMLElement> {
  skills: string[]
  titleSize: string
}

export function SkillsSection({
  skills,
  titleSize,
  className,
  ...props
}: SkillsSectionProps) {
  return (
    <section className={cn("flex-wrap space-y-3", className)} {...props}>
      <h2 className={cn("font-semibold transition-colors", titleSize)}>
        Навыки
      </h2>
      {skills.length ? (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <SkillBadge skill={skill} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Отсутствуют</p>
      )}
    </section>
  )
}
