import { HTMLAttributes, useContext } from "react"

import { cn } from "@/lib/utils"

import { ProfileContext } from "../context/ProfileContext"

type ProfileUserAboutProps = HTMLAttributes<HTMLDivElement>

export function ProfileAbout({ className, ...props }: ProfileUserAboutProps) {
  const { mainInformation = "" } = useContext(ProfileContext)
  return (
    <div className={cn(className)} {...props}>
      <h2 className="text-3xl font-semibold transition-colors">О себе</h2>
      <span className="mt-2 inline-block text-sm">{mainInformation}</span>
    </div>
  )
}
