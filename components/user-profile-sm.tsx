import { IUser } from "@/types/interfaces/IUser"
import { concatStrings } from "@/lib/concatStrings"

import { LinkTitle } from "./link-title"
import { AboutSection } from "./sections/about-section"
import { ContactSection } from "./sections/contacts-section"
import { UserAvatar } from "./user-avatar"

type UserProfileSmall = Omit<IUser, "resumes" | "projects">

export function UserProfileSmall(props: UserProfileSmall) {
  const { id, contacts, email, mainInformation, name, surname } = props

  return (
    <div className="flex flex-col justify-start gap-5 md:flex-row">
      <UserAvatar
        userId={id}
        name={name}
        surname={surname}
        className="mx-auto h-24 w-24"
      />

      <div className="flex flex-col gap-3">
        <section>
          <LinkTitle
            href={`/profile/${id}`}
            className="text-2xl font-semibold md:text-3xl"
          >
            {concatStrings(" ", name, surname)}
          </LinkTitle>
          <p className="text-xs text-muted-foreground md:text-sm">{email}</p>
        </section>

        <ContactSection contacts={contacts} titleSize="text-xl md:text-2xl" />
        <AboutSection
          title="О себе"
          description={mainInformation}
          titleSize="text-xl md:text-2xl"
          className="space-y-0"
        />
      </div>
    </div>
  )
}
