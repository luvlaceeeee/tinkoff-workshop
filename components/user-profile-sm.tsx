import Link from "next/link"

import { IUser } from "@/types/interfaces/IUser"
import { concatStrings } from "@/lib/concatStrings"
import { generateKey } from "@/lib/generateKey"
import { getNameAbbreviation } from "@/lib/getNameAbbreviation"
import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { buttonVariants } from "./ui/button"

type UserProfileSmall = Omit<IUser, "resumes" | "projects">

export function UserProfileSmall(props: UserProfileSmall) {
  const {
    id,
    contacts,
    createdWhen,
    email,
    mainInformation,
    name,
    picture,
    surname,
  } = props

  return (
    <div className="flex justify-start gap-5">
      <Avatar className="h-24 w-24 select-none">
        <AvatarImage src={picture} />
        <AvatarFallback className="text-3xl">
          {getNameAbbreviation(concatStrings(" ", name, surname)!)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-3">
        <section>
          <h1
            className={cn(
              buttonVariants({ variant: "link" }),
              "inline-block h-fit p-0 text-3xl font-semibold "
            )}
          >
            <Link href={`/profile/${id}`}>
              {concatStrings(" ", name, surname)}
            </Link>
          </h1>
          <p className="text-sm text-muted-foreground">{email}</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold transition-colors">Контакты</h2>
          {contacts ? (
            contacts.map((contact) => (
              <ul className="ml-6 list-disc [&>li]:mt-2">
                <li key={generateKey("li")}>
                  <Link
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "h-fit p-0"
                    )}
                    target="_blank"
                    href={contact}
                  >
                    {contact}
                  </Link>
                </li>
              </ul>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Отсутствуют</p>
          )}
        </section>
        <section>
          <h2 className="text-2xl font-semibold transition-colors">О себе</h2>
          {mainInformation ? (
            <p className="text-sm">{mainInformation}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Отсутствует</p>
          )}
        </section>
      </div>
    </div>
  )
}
