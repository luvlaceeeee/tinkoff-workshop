import { ReactNode } from "react"

import ProfileHeader from "./components/profile-header"

function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <ProfileHeader />
      <div className="flex gap-10 pt-5">{children}</div>
    </div>
  )
}

export default ProfileLayout
