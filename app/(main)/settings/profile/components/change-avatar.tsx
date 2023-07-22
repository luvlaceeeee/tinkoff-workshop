import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/user-avatar"

import { ChangeAvatarDialog } from "./change-avatar-dialog"

interface ChangeAvatarProps extends HTMLAttributes<HTMLElement> {
  name: string
  surname: string
  userId: number
}

export function ChangeAvatar({
  name,
  surname,
  className,
  userId,
  ...props
}: ChangeAvatarProps) {
  return (
    <section
      className={cn("flex flex-row items-center gap-6 md:flex-col", className)}
      {...props}
    >
      <UserAvatar
        userId={userId}
        name={name}
        surname={surname}
        className="h-28 w-28 md:h-44 md:w-44"
      />
      <ChangeAvatarDialog />
    </section>
  )
}
