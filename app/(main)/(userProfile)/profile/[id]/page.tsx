"use client"

import { UserProfileAbout } from "../../components/user-profile-about"
import { UserProfileAvatar } from "../../components/user-profile-avatar"
import { UserProfileContacts } from "../../components/user-profile-contacts"
import { UserProfileProjects } from "../../components/user-profile-projects"
import { UserProfileResume } from "../../components/user-profile-resume"

export default function UserProfilePage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 md:flex-row">
        <UserProfileAvatar />
        <div className="flex w-full flex-col justify-between gap-5 border-b md:flex-row">
          <UserProfileContacts className="flex-1" />
          <UserProfileAbout className="flex-1" />
        </div>
      </div>
      <UserProfileResume />
      <UserProfileProjects />
    </div>
  )
}
