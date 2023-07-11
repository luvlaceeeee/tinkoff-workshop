"use client"

import { useUser } from "@/hooks/useUser"

import {
  ProfileUserAbout,
  ProfileUserAvatar,
  ProfileUserContacts,
  ProfileUserHeader,
  ProfileUserProjects,
  ProfileUserResume,
} from "./components"
import { ProfileLoading } from "./components/profile-loader"
import { projectsMock } from "./config/mock"
import { UserContext } from "./context/UserContext"

function ProfilePage() {
  const { data: user, isLoading, error } = useUser()

  if (isLoading) return <ProfileLoading />

  if (!user) return <div>{error.response?.data.message}</div>

  return (
    <UserContext.Provider value={user}>
      <ProfileUserAvatar />
      <section className="flex w-full flex-col gap-5">
        <ProfileUserHeader />
        <section className="flex justify-between gap-6 border-b pb-4">
          <ProfileUserContacts className="flex-1" />
          <ProfileUserAbout className="flex-1" />
        </section>
        <ProfileUserResume />
        <ProfileUserProjects projects={projectsMock} />
      </section>
    </UserContext.Provider>
  )
}

export default ProfilePage
