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
      className={cn("flex flex-col items-center gap-3", className)}
      {...props}
    >
      <UserAvatar
        userId={userId}
        name={name}
        surname={surname}
        className="h-44 w-44"
      />
      <ChangeAvatarDialog />
    </section>
  )
}
