"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useUserStore } from "@/store/userStore"

import { IUser } from "@/types/interfaces/IUser"
import { concatStrings } from "@/lib/concatStrings"
import { convertDate } from "@/lib/convertDate"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { MainPagesHeader } from "@/components/header/main-pages-header"

import { UserProfileLoading } from "../../components/user-profile-loader"
import { UserProfileContext } from "../../context/UserProfileContext"
import { useUserById } from "../../hooks/useUserById"

export default function UserProfileLayout({
  params,
  children,
}: {
  params: { id: string }
  children: ReactNode
}) {
  const { data: user = {} as IUser, isLoading } = useUserById(+params.id)
  const currentUser = useUserStore((state) => state.user)

  if (isLoading) return <UserProfileLoading />
  if (!user.id) notFound()

  return (
    <div className="flex flex-col">
      <MainPagesHeader
        title={concatStrings(" ", user.name, user.surname)!}
        description={`Присоединился ${convertDate(user.createdWhen)}`}
      >
        <div className="flex items-center gap-2">
          <BackButton />
          {user.email === currentUser.email && (
            <Link href={"/settings/profile"}>
              <Button variant={"main"}>Редактировать профиль</Button>
            </Link>
          )}
        </div>
      </MainPagesHeader>
      <div className="pt-5">
        <UserProfileContext.Provider value={user}>
          {children}
        </UserProfileContext.Provider>
      </div>
    </div>
  )
}
