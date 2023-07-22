"use client"

import { HTMLAttributes, useContext } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"

import { ProfileContext } from "../context/ProfileContext"
import { DeleteAccountDialog } from "./delete-account-dialog"

type ProfileUserAvatarProps = HTMLAttributes<HTMLElement>

export function ProfileAvatar({ className, ...props }: ProfileUserAvatarProps) {
  const { name, surname, id } = useContext(ProfileContext)
  return (
    <section
      className={cn("flex flex-row items-center gap-6 md:flex-col", className)}
      {...props}
    >
      <UserAvatar
        userId={id}
        name={name}
        surname={surname}
        className="h-28 w-28 md:h-44 md:w-44"
      />
      <div className="flex w-full flex-col gap-3">
        <Button variant={"main"} className="w-full text-sm" size={"sm"}>
          <Link href={"/settings/profile"}>Изменить профиль</Link>
        </Button>
        <DeleteAccountDialog />
      </div>
    </section>
  )
}
