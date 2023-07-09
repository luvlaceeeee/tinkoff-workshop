"use client"


import { useUser } from "../../../../hooks/useUser"
import { userMock } from "../../profile/config/mock"
import { useUser } from "../../shared/hooks/useUser"
import { ChangeAvatar } from "./components/change-avatar"
import { ProfileEditForm } from "./components/profile-edit-form"

function ProfileSettingsPage() {
  const { contacts, picture, name, surname, email, description, createWhen } =
    userMock
  const { data: user, isLoading, error } = useUser()
  return (
    <>
      <ChangeAvatar avatar={picture} name={name} surname={surname} />
      <ProfileEditForm user={user!} />
    </>
  )
}

export default ProfileSettingsPage
