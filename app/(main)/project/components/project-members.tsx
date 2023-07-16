import { IProjectMember } from "@/types/interfaces/IProjectMember"

import { MembersCard } from "./members-card"

export function ProjectMembers({ members }: { members: IProjectMember[] }) {
  const lead = members.find((member) => member.isLead)
  const currentMembers = members.filter(
    (member) => member.userId !== lead?.userId
  )
  return (
    <div className="w-1/3 shrink-0 space-y-3">
      <h1 className="text-3xl font-semibold transition-colors">
        Участники ({members.length})
      </h1>

      <div className="space-y-1">
        <h2 className="text-lg transition-colors">Создатель</h2>
        <MembersCard {...lead!} />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg transition-colors">Участники</h3>
        {currentMembers.map((member) => (
          <MembersCard {...member} />
        ))}
      </div>
    </div>
  )
}
