"use client"

import { useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

import { IUser } from "@/types/interfaces/IUser"
import { concatStrings } from "@/lib/concatStrings"
import { useUser } from "@/hooks/useUser"

import { Icons } from "./icons"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { UserAvatar } from "./user-avatar"

export function UserAvatarDropdown() {
  const { data: user = {} as IUser, isLoading } = useUser()
  const [open, setOpen] = useState(false)
  //TODO Добавить запрос на /logout

  if (isLoading)
    return (
      <Avatar>
        <AvatarImage src={""} />
        <AvatarFallback>
          <Icons.loader className="ml-3 h-7 w-7 fill-foreground" />
        </AvatarFallback>
      </Avatar>
    )

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="select-none rounded-full">
        <UserAvatar userId={user.id} name={user.name} surname={user.surname} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuLabel>
          {concatStrings(" ", user?.name, user?.surname)}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/profile"}>
          <DropdownMenuItem>Профиль</DropdownMenuItem>
        </Link>
        <Link href={"/settings/profile"}>
          <DropdownMenuItem>Настройки</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => {
            signOut()
            redirect("/")
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
