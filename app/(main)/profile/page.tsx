import {
  ProfileUserAbout,
  ProfileUserAvatar,
  ProfileUserContacts,
  ProfileUserHeader,
  ProfileUserProjects,
  ProfileUserResume,
} from "./components"
import { projectsMock, resumesMock, userMock } from "./config/mock"

function ProfilePage() {
  const { contacts, picture, name, surname, email, description, createWhen } =
    userMock
  return (
    <>
      <ProfileUserAvatar avatar={picture} name={name} surname={surname} />
      <section className="flex w-full flex-col gap-5">
        <ProfileUserHeader name={name} surname={surname} email={email} />
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
