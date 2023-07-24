import { generateKey } from "@/lib/generateKey"

import { MembersCard } from "../../../components/members-card"
import { useProjectMembersById } from "../../../hooks/useProjectMembersById"
import { DeleteMemberDialog } from "./delete-member-dialog"

export function ProjectEditMembers({
  // members,
  projectId,
}: {
  // members: IProjectMember[]
  projectId: number
}) {
  // const lead = members.find((member) => member.isLead)
  // const currentMembers = members.filter(
  //   (member) => member.userId !== lead?.userId
  // )

  const { data: members = [], isLoading } = useProjectMembersById(projectId)
  const lead = members.find((member) => member.isLead)

  if (isLoading) return <div>Loading</div>

  return (
    <div className="shrink-0 space-y-3 md:w-1/3">
      <h1 className="text-2xl font-semibold transition-colors md:text-3xl">
        Участники ({members.length})
      </h1>

      <div className="space-y-1">
        <h2 className="text-lg transition-colors">Создатель</h2>
        <MembersCard {...lead!} />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg transition-colors">Участники</h3>
        {members
          .filter((member) => !member.isLead)
          .map((member) => (
            <div
              className="flex items-center gap-2"
              key={generateKey("member")}
            >
              <MembersCard {...member} />
              <DeleteMemberDialog
                projectId={projectId}
                userId={member.userId}
                direction={member.direction.directionName}
                name={member.name}
                surname={member.surname}
              />
            </div>
          ))}
      </div>
    </div>
  )
}
