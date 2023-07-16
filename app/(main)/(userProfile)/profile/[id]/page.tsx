"use client"

import { UserProfileAbout } from "../../components/user-profile-about"
import { UserProfileAvatar } from "../../components/user-profile-avatar"
import { UserProfileContacts } from "../../components/user-profile-contacts"
import { UserProfileResume } from "../../components/user-profile-resume"

//TODO Добавить проекты
export default function UserProfilePage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <UserProfileAvatar />
        <div className="flex w-full justify-between gap-5 border-b">
          <UserProfileContacts className="flex-1" />
          <UserProfileAbout className="flex-1" />
        </div>
      </div>
      <UserProfileResume />
    </div>
  )
}
