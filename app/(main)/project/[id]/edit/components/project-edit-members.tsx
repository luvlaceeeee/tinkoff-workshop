import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

import { MembersCard } from "../../../components/members-card"
import { useProjectMembersById } from "../../../hooks/useProjectMembersById"

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

  return (
    <div className="flex w-1/3 shrink-0 flex-col gap-3">
      <h1 className="text-3xl font-semibold transition-colors">
        Участники ({members.length})
      </h1>

      <div className="space-y-1">
        <h2 className="text-lg transition-colors">Создатель</h2>
        <div className="flex w-full items-center gap-2">
          <MembersCard {...members[0]} />
          <Button
            type="button"
            variant="outline"
            className="border-destructive/50"
            size="icon"
          >
            <X />
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg transition-colors">Участники</h3>
        {members.slice(1).map((member) => (
          <div className="flex w-full items-center gap-2">
            <MembersCard {...member} />
            <Button
              type="button"
              variant="outline"
              className="border-destructive/50"
              size="icon"
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
