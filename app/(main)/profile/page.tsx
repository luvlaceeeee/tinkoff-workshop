"use client"

import { useUser } from "@/hooks/useUser"
import {
  ProfileAbout,
  ProfileAvatar,
  ProfileContacts,
  ProfileHeader,
  ProfileProjects,
  ProfileResume,
} from "@/app/(main)/profile/components"
import { projectsMock } from "@/app/(main)/profile/config/mock"
import { ProfileContext } from "@/app/(main)/profile/context/ProfileContext"

import { ProfileLoading } from "./components/profile-loader"

function ProfilePage() {
  const { data: user, isLoading, error } = useUser()

  if (isLoading) return <ProfileLoading />

  if (!user) return <div>{error.response?.data.message}</div>

  return (
    <ProfileContext.Provider value={user}>
      <ProfileAvatar />
      <section className="flex w-full flex-col gap-5">
        <ProfileHeader />
        <section className="flex justify-between gap-6 border-b pb-4">
          <ProfileContacts className="flex-1" />
          <ProfileAbout className="flex-1" />
        </section>
        <ProfileResume />
        <ProfileProjects projects={projectsMock} />
      </section>
    </ProfileContext.Provider>
  )
}

export default ProfilePage
