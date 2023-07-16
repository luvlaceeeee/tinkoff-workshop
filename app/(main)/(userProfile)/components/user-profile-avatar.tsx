import { HTMLAttributes, useContext } from "react"

import { concatStrings } from "@/lib/concatStrings"
import { getNameAbbreviation } from "@/lib/getNameAbbreviation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { UserProfileContext } from "../context/UserProfileContext"

type ProfileUserAvatarProps = HTMLAttributes<HTMLElement>

export function UserProfileAvatar({
  className,
  ...props
}: ProfileUserAvatarProps) {
  const { name, surname, picture } = useContext(UserProfileContext)
  return (
    <section
      className={cn("flex flex-col items-center gap-3", className)}
      {...props}
    >
      <Avatar className="h-44 w-44 select-none">
        <AvatarImage src={picture} />
        <AvatarFallback className="text-6xl">
          {getNameAbbreviation(concatStrings(" ", name, surname)!)}
        </AvatarFallback>
      </Avatar>
    </section>
  )
}
