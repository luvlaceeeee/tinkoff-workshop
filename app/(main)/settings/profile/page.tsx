"use client"

<<<<<<< HEAD
=======
import { useUser } from "../../../../hooks/useUser"
>>>>>>> ed3190f2284f0d449ff4c5a770b011a94093049d
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
