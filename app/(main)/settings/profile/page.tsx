"use client"

import { useUser } from "@/hooks/useUser"

import { ChangeAvatar } from "./components/change-avatar"
import { ProfileEditForm } from "./components/profile-edit-form"

function ProfileSettingsPage() {
  const { data: user, isLoading, error } = useUser()

  if (isLoading) return <div>Loading</div>

  return (
    <>
      <ChangeAvatar avatar={""} name={user?.name!} surname={user?.surname!} />
      <ProfileEditForm user={user!} />
    </>
  )
}

export default ProfileSettingsPage
