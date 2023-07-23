"use client"

import Link from "next/link"

import { useUser } from "@/hooks/useUser"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { UserProfileSmall } from "@/components/user-profile-sm"

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
    <div className="md:flex-1">
      <div className="flex flex-col gap-2 pb-3 md:flex-row md:items-center md:justify-between">
        <Label className="text-center text-xs md:text-sm">
          Эта информация будет видна на странице резюме
        </Label>
        <Link href={"/settings/profile"}>
          <Button variant={"outline"} className="w-full md:w-fit">
            Редактировать профиль
          </Button>
        </Link>
      </div>
      <UserProfileSmall {...user} />
    </div>
  )
}
