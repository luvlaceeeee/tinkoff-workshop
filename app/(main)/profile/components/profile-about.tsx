import { HTMLAttributes, useContext } from "react"

import { cn } from "@/lib/utils"

import { ProfileContext } from "../context/ProfileContext"

type ProfileUserAboutProps = HTMLAttributes<HTMLDivElement> & {
  // mainInformation: string
}

export function ProfileAbout({ className, ...props }: ProfileUserAboutProps) {
  const { mainInformation = "" } = useContext(ProfileContext)
  return (
    <div className={cn(className, "space-y-2")} {...props}>
      <h2 className="text-3xl font-semibold transition-colors">О себе</h2>
      {mainInformation ? (
        <span className="inline-block text-sm">{mainInformation}</span>
      ) : (
        <p className="text-sm text-muted-foreground">Отсутствует</p>
      )}
    </div>
  )
}
