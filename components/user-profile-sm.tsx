import Link from "next/link"

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
    <div className="flex cursor-pointer flex-col items-start justify-start gap-5 rounded-xl border bg-secondary/20 p-5 hover:bg-secondary/30 md:flex-row">
      <Link href={`/profile/${id}`}>
        <UserAvatar
          userId={id}
          name={name}
          surname={surname}
          className="mx-auto h-24 w-24 md:mx-0"
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
            className="space-y-0 break-words"
          />
        </div>
      </Link>
    </div>
  )
}
