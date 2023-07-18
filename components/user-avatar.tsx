import { concatStrings } from "@/lib/concatStrings"
import { getNameAbbreviation } from "@/lib/getNameAbbreviation"
import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface UserAvatarProps {
  userId: number
  name: string
  surname: string
  className?: string
}

export function UserAvatar(props: UserAvatarProps) {
  const { userId, name, surname, className } = props
  return (
    <Avatar className={cn("select-none", className)}>
      <AvatarImage
        src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/files/${userId}`}
      />
      <AvatarFallback className="text-xl">
        {getNameAbbreviation(concatStrings(" ", name, surname)!)}
      </AvatarFallback>
    </Avatar>
  )
}
