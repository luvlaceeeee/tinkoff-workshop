import { IResume } from "@/types/interfaces/IResume"
import { generateKey } from "@/lib/generateKey"
import { ResumeCardSmall } from "@/components/cards/resume-card-sm"

interface ProfileUserResumeProps {
  resumes: IResume[]
}

export function ProfileUserResume({ resumes }: ProfileUserResumeProps) {
  return (
    <div>
      <h2 className="text-3xl font-semibold transition-colors">
        Активные резюме: {resumes.length}
      </h2>
      <div className="flex w-full gap-6 pt-5">
        {resumes.map(({ direction, createWhen, description, skills, id }) => (
          <ResumeCardSmall
            key={generateKey("resume-card")}
            className="w-1/3"
            direction={direction}
            createWhen={createWhen}
            description={description}
            skills={skills}
            id={id}
          />
        ))}
      </div>
    </div>
  )
}
