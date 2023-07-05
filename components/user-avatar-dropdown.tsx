import Link from "next/link"
import { useAuthStore } from "@/store/authStore"
import { LogOut } from "lucide-react"

import { concatStrings } from "@/lib/concatStrings"
import { getNameAbbreviation } from "@/lib/getNameAbbreviation"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function UserAvatarDropdown() {
  const { user } = useAuthStore((state) => state)
  const { name, surname, picture } = user
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="select-none rounded-full">
        <Avatar>
          <AvatarImage src={picture} />
          <AvatarFallback>
            {getNameAbbreviation(concatStrings(" ", name, surname)!)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuLabel>
          {concatStrings(" ", name, surname)}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/profile"}>
          <DropdownMenuItem>
            {/* <User className="mr-2 h-4 w-4" /> */}
            Профиль
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          {/* <Users className="mr-2 h-4 w-4" /> */}
          Мои команды
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
