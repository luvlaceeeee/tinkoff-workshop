"use client"

import { useQuery } from "@tanstack/react-query"

import { IResume } from "@/types/interfaces/IResume"
import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"
import { ResumeCardSmall } from "@/components/cards/resume-card-sm"

interface ProfileUserResumeProps {
  resumes: IResume[]
}

export function ProfileUserResume({ resumes }: ProfileUserResumeProps) {
  const { data, isLoading } = useQuery(["user-resumes"], () =>
    $api.get("/resumes/users").then((res) => res.data)
  )

  if (isLoading) return <div>Loading</div>

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
