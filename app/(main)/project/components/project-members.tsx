import { Fragment } from "react"

import { IProjectMember } from "@/types/interfaces/IProjectMember"
import { generateKey } from "@/lib/generateKey"
import { Skeleton } from "@/components/ui/skeleton"

import { useProjectMembersById } from "../hooks/useProjectMembersById"
import { MembersCard } from "./members-card"

export function ProjectMembers({ projectId }: { projectId: number }) {
  // const lead = members.find((member) => member.isLead)
  // const currentMembers = members.filter(
  //   (member) => member.userId !== lead?.userId
  // )

  const { data: members = [] as IProjectMember[], isLoading } =
    useProjectMembersById(projectId)
  const lead = members.find((member) => member.isLead)
  return (
    <div className="shrink-0 space-y-3 md:w-1/3">
      <h1 className="text-2xl font-semibold transition-colors md:text-3xl">
        Участники ({isLoading ? 0 : members.length})
      </h1>

      <div className="space-y-1">
        <h2 className="text-lg transition-colors">Создатель</h2>
        {isLoading ? (
          <Skeleton className="h-18 rounded-2xl" />
        ) : (
          <MembersCard {...lead!} />
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-lg transition-colors">Участники</h3>
        {isLoading
          ? [...new Array(3)].map(() => (
              <Skeleton
                className="h-18 rounded-2xl"
                key={generateKey("skeleton")}
              />
            ))
          : members
              .filter((member) => !member.isLead)
              .map((member) => (
                <Fragment key={generateKey("member-card")}>
                  <MembersCard {...member} />
                </Fragment>
              ))}
      </div>
    </div>
  )
}
