import { HTMLAttributes } from "react"

import { concatStrings } from "@/lib/concatStrings"
import { getNameAbbreviation } from "@/lib/getNameAbbreviation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ChangeAvatarDialog } from "./change-avatar-dialog"

interface ChangeAvatarProps extends HTMLAttributes<HTMLElement> {
  avatar: string
  name: string
  surname: string
}

export function ChangeAvatar({
  avatar,
  name,
  surname,
  className,
  ...props
}: ChangeAvatarProps) {
  return (
    <section
      className={cn("flex flex-col items-center gap-3", className)}
      {...props}
    >
      <Avatar className="h-44 w-44 select-none">
        <AvatarImage src={avatar} />
        <AvatarFallback>
          {getNameAbbreviation(concatStrings(" ", name, surname)!)}
        </AvatarFallback>
      </Avatar>
      {/* <Button variant={"main"} asChild>
        <Link href={"/settings/profile"}>Изменить фото</Link>
      </Button> */}
      <ChangeAvatarDialog />
    </section>
  )
}
