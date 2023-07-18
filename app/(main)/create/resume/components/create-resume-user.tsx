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
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <Label>Эта информация будет видна на странице резюме</Label>
        <Button variant={"ghost"} asChild>
          <Link href={"/settings/profile"}>Редактировать профиль</Link>
        </Button>
      </div>
      <UserProfileSmall {...user} />
    </div>
  )
}
