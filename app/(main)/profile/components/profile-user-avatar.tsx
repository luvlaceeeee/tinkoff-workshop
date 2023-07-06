import { HTMLAttributes } from "react"
import Link from "next/link"

import { concatStrings } from "@/lib/concatStrings"
import { getNameAbbreviation } from "@/lib/getNameAbbreviation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface ProfileUserAvatarProps extends HTMLAttributes<HTMLElement> {
  avatar: string
  name: string
  surname: string
}

export function ProfileUserAvatar({
  avatar,
  name,
  surname,
  className,
  ...props
}: ProfileUserAvatarProps) {
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
      <Button variant={"main"} asChild>
        <Link href={"/settings/profile"}>Изменить профиль</Link>
      </Button>
    </section>
  )
}