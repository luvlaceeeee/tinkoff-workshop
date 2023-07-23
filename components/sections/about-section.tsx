import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface AboutSectionProps extends HTMLAttributes<HTMLElement> {
  title: string
  description: string
  titleSize: string
}

export function AboutSection({
  title,
  description,
  titleSize,
  className,
  ...props
}: AboutSectionProps) {
  return (
    <section className={cn("space-y-3 break-all", className)} {...props}>
      <h2 className={cn("font-semibold transition-colors", titleSize)}>
        {title}
      </h2>
      {description ? (
        <p>{description}</p>
      ) : (
        <p className="text-sm text-muted-foreground">Отсутствует</p>
      )}
    </section>
  )
}
