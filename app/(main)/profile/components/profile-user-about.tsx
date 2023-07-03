import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface ProfileUserAboutProps extends HTMLAttributes<HTMLDivElement> {
  description: string
}

export default function ProfileUserAbout({
  description,
  className,
  ...props
}: ProfileUserAboutProps) {
  return (
    <div className={cn(className)} {...props}>
      <h2 className="text-3xl font-semibold transition-colors">О себе</h2>
      <span className="mt-2 inline-block text-sm">{description}</span>
    </div>
  )
}
