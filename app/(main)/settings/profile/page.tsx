"use client"

import { IUser } from "@/types/interfaces/IUser"
import { useUser } from "@/hooks/useUser"
import { Separator } from "@/components/ui/separator"

import { ChangeAvatar } from "./components/change-avatar"
import { ProfileEditForm } from "./components/profile-edit-form"

function ProfileSettingsPage() {
  const { data: user = {} as IUser, isLoading } = useUser()

  if (isLoading)
    return (
      <>
        <div className="flex flex-col items-center gap-3">
          <Separator className="h-44 w-44 rounded-full" />
          <Separator className="h-10 w-32 rounded-2xl" />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <Separator className="h-24 rounded-2xl" />
          <Separator className="h-24 rounded-2xl" />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <Separator className="h-24 rounded-2xl" />
          <Separator className="h-24 rounded-2xl" />
        </div>
      </>
    )

  return (
    <>
      <ChangeAvatar name={user.name} surname={user.surname} userId={user.id} />
      <ProfileEditForm user={user} />
    </>
  )
}

export default ProfileSettingsPage
