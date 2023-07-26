import { useUserStore } from "@/store/userStore"

import { IProjectMember } from "@/types/interfaces/IProjectMember"
import { concatStrings } from "@/lib/concatStrings"
import { convertDate } from "@/lib/convertDate"
import { LinkTitle } from "@/components/link-title"
import { UserAvatar } from "@/components/user-avatar"

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
        <UserAvatar
          userId={userId}
          name={name}
          surname={surname}
          className="h-10 w-10"
        />
        <div>
          <LinkTitle
            href={`/profile/${userId}`}
            className="text-base md:text-lg"
          >
            {concatStrings(" ", name, surname)}
          </LinkTitle>
          <h2 className="text-xs text-muted-foreground md:text-sm">
            {direction && direction.description}
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
