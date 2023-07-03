import { IProject } from "@/types/interfaces/IProject"
import { generateKey } from "@/lib/generateKey"
import ProjectCardSmall from "@/components/cards/project-card-sm"

interface ProfileUserResumeProps {
  projects: IProject[]
}

export default function ProfileUserProjects({
  projects,
}: ProfileUserResumeProps) {
  return (
    <div>
      <h2 className="text-3xl font-semibold transition-colors">
        Проекты: {projects.length}
      </h2>
      <div className="flex w-full gap-6 pt-5">
        {projects.map(({ title, theme, status, description }) => (
          <ProjectCardSmall
            key={generateKey("project-card")}
            className="w-1/3"
            title={title}
            theme={theme}
            status={status}
            description={description}
          />
        ))}
      </div>
    </div>
  )
}
