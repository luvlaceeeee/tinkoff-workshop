"use client"

import { useUser } from "../shared/hooks/useUser"
import {
  ProfileUserAbout,
  ProfileUserAvatar,
  ProfileUserContacts,
  ProfileUserHeader,
  ProfileUserProjects,
  ProfileUserResume,
} from "./components"
import { projectsMock, resumesMock, userMock } from "./config/mock"
import { UserContext } from "./context/UserContext"

function ProfilePage() {
  const { contacts, description } = userMock

  const { data: user, isLoading, error } = useUser()

  if (isLoading) return <div>Loading</div>

  if (!user) return <div>{error.response?.data.message}</div>

  return (
    <UserContext.Provider value={user}>
      <ProfileUserAvatar />
      <section className="flex w-full flex-col gap-5">
        <ProfileUserHeader />
        <section className="flex justify-between gap-6 border-b pb-4">
          <ProfileUserContacts className="flex-1" contacts={contacts} />
          <ProfileUserAbout className="flex-1" description={description} />
        </section>
        <ProfileUserResume resumes={resumesMock} />
        <ProfileUserProjects projects={projectsMock} />
      </section>
    </UserContext.Provider>
  )
}

export default ProfilePage
