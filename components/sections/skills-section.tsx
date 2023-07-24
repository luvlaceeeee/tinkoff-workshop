import { HTMLAttributes, useState } from "react"

import { generateKey } from "@/lib/generateKey"
import { cn } from "@/lib/utils"

import { SkillBadge } from "../skill-badge"
import { Button } from "../ui/button"

interface SkillsSectionProps extends HTMLAttributes<HTMLElement> {
  skills: string[]
  titleSize: string
  isCard?: boolean
}

export function SkillsSection({
  skills,
  titleSize,
  className,
  isCard = false,
  ...props
}: SkillsSectionProps) {
  const [fullList, setFullList] = useState(false)
  return (
    <section className={cn("flex-wrap space-y-3", className)} {...props}>
      <h2 className={cn("font-semibold transition-colors", titleSize)}>
        Навыки
      </h2>
      {skills.length ? (
        isCard ? (
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
          <div className="flex flex-wrap gap-3">
            {!fullList
              ? skills
                  .slice(0, 15)
                  .map((skill) => (
                    <SkillBadge
                      skill={skill}
                      key={generateKey("skill-badge")}
                    />
                  ))
              : skills.map((skill) => (
                  <SkillBadge skill={skill} key={generateKey("skill-badge")} />
                ))}
            {skills.length > 15 && (
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => setFullList(!fullList)}
              >
                {fullList ? "Скрыть" : "Показать все"}
              </Button>
            )}
          </div>
        )
      ) : (
        <p className="text-sm text-muted-foreground">Отсутствуют</p>
      )}
    </section>
  )
}
