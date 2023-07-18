import { HTMLAttributes, useContext } from "react"

import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/user-avatar"

import { UserProfileContext } from "../context/UserProfileContext"

type ProfileUserAvatarProps = HTMLAttributes<HTMLElement>

export function UserProfileAvatar({
  className,
  ...props
}: ProfileUserAvatarProps) {
  const { name, surname, id } = useContext(UserProfileContext)
  return (
    <section
      className={cn("flex flex-col items-center gap-3", className)}
      {...props}
    >
      <UserAvatar
        userId={id}
        name={name}
        surname={surname}
        className="h-44 w-44"
      />
    </section>
  )
}
