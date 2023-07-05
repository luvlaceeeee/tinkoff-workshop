import { userMock } from "../../profile/config/mock"
import { ChangeAvatar } from "./components/change-avatar"
import { ProfileEditForm } from "./components/profile-edit-form"

function ProfileSettingsPage() {
  const { contacts, picture, name, surname, email, description, createWhen } =
    userMock
  return (
    <>
      <ChangeAvatar avatar={picture} name={name} surname={surname} />
      <ProfileEditForm />
    </>
  )
}

export default ProfileSettingsPage
