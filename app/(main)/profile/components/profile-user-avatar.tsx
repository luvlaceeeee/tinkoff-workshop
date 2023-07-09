import { HTMLAttributes, useContext } from "react"
import Link from "next/link"

import { concatStrings } from "@/lib/concatStrings"
import { getNameAbbreviation } from "@/lib/getNameAbbreviation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { UserContext } from "../context/UserContext"
import { DeleteAccountDialog } from "./delete-account-dialog"

type ProfileUserAvatarProps = HTMLAttributes<HTMLElement>

export function ProfileUserAvatar({
  className,
  ...props
}: ProfileUserAvatarProps) {
  const { picture, name, surname } = useContext(UserContext)
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
      <Button variant={"main"} className="w-full" asChild>
        <Link href={"/settings/profile"}>Изменить профиль</Link>
      </Button>
      <DeleteAccountDialog />
    </section>
  )
}
