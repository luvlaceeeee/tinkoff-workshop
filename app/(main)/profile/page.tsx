"use client"

import { concatStrings } from "@/lib/concatStrings"

import ProfileUserAbout from "./components/profile-user-about"
import ProfileUserAvatar from "./components/profile-user-avatar"
import ProfileUserContacts from "./components/profile-user-contacts"
import ProfileUserProjects from "./components/profile-user-projects"
import ProfileUserResume from "./components/profile-user-resumes"
import { projectsMock, resumesMock, userMock } from "./config/mock"

function ProfilePage() {
  const { contacts, picture, name, surname, email, description, createWhen } =
    userMock
  return (
    <>
      <ProfileUserAvatar avatar={picture} name={name} surname={surname} />
      <section className="flex w-full flex-col gap-5">
        <header className="space-y-1">
          <h1 className="text-4xl font-bold transition-colors">
            {concatStrings(" ", name, surname)}
          </h1>
          <p className="text-sm text-muted-foreground">{email}</p>
        </header>
        <section className="flex justify-between gap-6 border-b pb-4">
          <ProfileUserContacts className="flex-1" contacts={contacts} />
          <ProfileUserAbout className="flex-1" description={description} />
        </section>
        <ProfileUserResume resumes={resumesMock} />
        <ProfileUserProjects projects={projectsMock} />
      </section>
    </>
  )
}

export default ProfilePage
