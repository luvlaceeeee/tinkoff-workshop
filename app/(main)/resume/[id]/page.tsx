"use client"

import { IResume } from "@/types/interfaces/IResume"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { UserProfileSmall } from "@/components/user-profile-sm"

import { useResumeById } from "../hooks/useResumeById"

export default function ResumePage({ params }: { params: { id: string } }) {
  const { data: resume = {} as IResume } = useResumeById(+params.id)

  return (
    <div className="flex justify-between gap-10">
      <div className="flex flex-1 flex-col gap-5 border-r pr-3">
        <SkillsSection skills={resume.skills} titleSize="text-3xl" />
        <AboutSection
          title="Опыт разработки"
          description={resume.description}
          titleSize="text-3xl"
        />
      </div>
      <div className="flex-1 space-y-3">
        <h2 className="text-3xl font-semibold transition-colors">
          О пользователе
        </h2>
        <UserProfileSmall {...resume.user} />
      </div>
    </div>
  )
}
