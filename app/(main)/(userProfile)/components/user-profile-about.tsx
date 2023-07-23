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
    <div className={cn(className, "pb-3 md:pb-0")} {...props}>
      <h2 className="text-2xl font-semibold transition-colors md:text-3xl">
        О себе
      </h2>
      {mainInformation ? (
        <span className="inline-block text-sm md:mt-2">{mainInformation}</span>
      ) : (
        <p className="text-sm text-muted-foreground">Отсутствует</p>
      )}
    </div>
  )
}
