"use client"

import { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

import { concatStrings } from "@/lib/concatStrings"
import { getNameAbbreviation } from "@/lib/getNameAbbreviation"
import { useUser } from "@/hooks/useUser"

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
  const { data: user } = useUser()

  //TODO Разобраться, почему саспенс и фоллбек не работают, а все грузиться во время лоудера
  if (!user) return <div>Error</div>

  return (
    <Suspense fallback={<div>Loading</div>}>
      <DropdownMenu>
        <DropdownMenuTrigger className="select-none rounded-full">
          <Avatar>
            <AvatarImage src={user?.picture} />
            <AvatarFallback>
              {getNameAbbreviation(
                concatStrings(" ", user?.name, user?.surname)!
              )}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="end">
          <DropdownMenuLabel>
            {concatStrings(" ", user?.name, user?.surname)}
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
          {/* Add request to /logout */}
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
    </Suspense>
  )
}
