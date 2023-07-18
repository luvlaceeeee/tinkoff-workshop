import Link from "next/link"
import { useUserStore } from "@/store/userStore"

import { IProjectMember } from "@/types/interfaces/IProjectMember"
import { concatStrings } from "@/lib/concatStrings"
import { convertDate } from "@/lib/convertDate"
import { getNameAbbreviation } from "@/lib/getNameAbbreviation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"

export function MembersCard(props: IProjectMember) {
  const { id } = useUserStore((state) => state.user)
  const { userId, name, surname, direction, joinDate } = props
  return (
    <div
      className={`flex flex-1 items-center justify-between gap-5 rounded-2xl border px-4 py-3 ${
        id === userId && "border-main"
      }`}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 select-none">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/files/${id}`}
          />
          <AvatarFallback>
            {getNameAbbreviation(concatStrings(" ", name, surname)!)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold">
            <Link
              href={`/profile/${userId}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "h-fit p-0 text-lg"
              )}
            >
              {concatStrings(" ", name, surname)}
            </Link>
          </h1>
          <h2 className="text-sm text-muted-foreground">
            {direction.description}
          </h2>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        <span>Присоединился</span>
        <p>{convertDate(joinDate)}</p>
      </div>
    </div>
  )
}
