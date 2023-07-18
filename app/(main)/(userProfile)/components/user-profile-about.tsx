import { HTMLAttributes, useContext } from "react"

import { cn } from "@/lib/utils"

import { UserProfileContext } from "../context/UserProfileContext"

type ProfileUserAboutProps = HTMLAttributes<HTMLDivElement>
//TODO Вынести в отдельный компонент
export function UserProfileAbout({
  className,
  ...props
}: ProfileUserAboutProps) {
  const { mainInformation = "" } = useContext(UserProfileContext)
  return (
    <div className={cn(className)} {...props}>
      <h2 className="mb-2 text-3xl font-semibold transition-colors">О себе</h2>
      {mainInformation ? (
        <span className="mt-2 inline-block text-sm">{mainInformation}</span>
      ) : (
        <p className="text-sm text-muted-foreground">Отсутствует</p>
      )}
    </div>
  )
}
