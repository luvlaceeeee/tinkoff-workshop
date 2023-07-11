"use client"

import Link from "next/link"

import { concatStrings } from "@/lib/concatStrings"
import { generateKey } from "@/lib/generateKey"
import { getNameAbbreviation } from "@/lib/getNameAbbreviation"
import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/useUser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

// const getUser = async () => {
//   const session = await getServerSession(authOptions)
//   return await $api
//     .get<IUser>("/users", {
//       headers: { Authorization: `Bearer ${session?.user.access_token}` },
//     })
//     .then((res) => res.data)
// }

export default function CreateResumeUser() {
  const { data: user, isLoading } = useUser()

  if (isLoading) return <Skeleton className="flex-1" />
  if (!user) return <div>error</div>

  return (
    <div className="flex-1">
      <Label className="font-light text-muted-foreground/30">
        Эта информация будет видна на странице резюме
      </Label>
      <div className="mt-1 flex justify-center gap-5">
        <Avatar className="h-24 w-24 select-none">
          <AvatarImage src={user.picture} />
          <AvatarFallback className="text-3xl">
            {getNameAbbreviation(concatStrings(" ", user.name, user.surname)!)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-3">
          <section>
            <h1 className="text-3xl font-semibold">
              {concatStrings(" ", user.name, user.surname)}
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </h1>
          </section>
          <section>
            <h2 className="text-2xl font-semibold transition-colors">
              Контакты
            </h2>
            <ul className="ml-6 list-disc [&>li]:mt-2">
              {user.contacts ? (
                user.contacts.map((contact) => (
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
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Пусто</p>
              )}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold transition-colors">О себе</h2>
            {user.mainInformation ? (
              <p className="text-sm">{user.mainInformation}</p>
            ) : (
              <p className="text-sm text-muted-foreground">Пусто</p>
            )}
          </section>
          <Button variant={"secondary"} asChild>
            <Link href={"/settings/profile"}>Редактировать профиль</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
