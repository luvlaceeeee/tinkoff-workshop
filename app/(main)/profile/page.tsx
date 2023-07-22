"use client"

import { notFound } from "next/navigation"

import { useUser } from "@/hooks/useUser"
import {
  ProfileAbout,
  ProfileAvatar,
  ProfileContacts,
  ProfileHeader,
  ProfileProjects,
  ProfileResume,
} from "@/app/(main)/profile/components"
import { ProfileContext } from "@/app/(main)/profile/context/ProfileContext"

import { ProfileLoading } from "./components/profile-loader"

function ProfilePage() {
  const { data: user, isLoading } = useUser()

  if (isLoading) return <ProfileLoading />

  if (!user) return notFound()

  return (
    <ProfileContext.Provider value={user}>
      <ProfileAvatar />
      <div className="flex w-full flex-col gap-3 md:gap-5">
        <ProfileHeader />
        <section className="flex flex-col justify-between gap-3 border-b pb-4 md:flex-row md:gap-6">
          <ProfileContacts className="flex-1" />
          <ProfileAbout className="flex-1" />
        </section>
        <ProfileResume />
        <ProfileProjects />
      </div>
    </ProfileContext.Provider>
  )
}

export default ProfilePage
