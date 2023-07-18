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
      className={cn("flex flex-col items-center gap-3", className)}
      {...props}
    >
      <UserAvatar
        userId={id}
        name={name}
        surname={surname}
        className="h-44 w-44"
      />
      <Button variant={"main"} className="w-full" asChild>
        <Link href={"/settings/profile"}>Изменить профиль</Link>
      </Button>
      <DeleteAccountDialog />
    </section>
  )
}
