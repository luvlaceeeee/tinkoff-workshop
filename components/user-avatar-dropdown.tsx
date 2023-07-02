import { useAuthStore } from "@/store/authStore"
import { LogOut } from "lucide-react"

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

export default function UserAvatarDropdown() {
  const { isAuth, user } = useAuthStore((state) => state)
  const { avatar, login, firstName, lastName } = user
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="select-none rounded-full">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>
            {getNameAbbreviation(firstName + " " + lastName)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuLabel>{login}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {/* <User className="mr-2 h-4 w-4" /> */}
          Профиль
        </DropdownMenuItem>
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
