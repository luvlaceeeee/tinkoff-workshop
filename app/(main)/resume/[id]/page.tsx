"use client"

import { IResume } from "@/types/interfaces/IResume"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { UserProfileSmall } from "@/components/user-profile-sm"

import { useResumeById } from "../hooks/useResumeById"

export default function ResumePage({ params }: { params: { id: string } }) {
  const { data: resume = {} as IResume } = useResumeById(+params.id)

  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:gap-10">
      <div className="flex flex-col gap-5 border-b pb-5 md:flex-1 md:border-b-0 md:border-r md:pb-0 md:pr-3">
        <SkillsSection
          skills={resume.skills}
          titleSize="text-2xl md:text-3xl"
        />
        <AboutSection
          title="Опыт разработки"
          description={resume.description}
          titleSize="text-2xl md:text-3xl"
        />
      </div>
      <div className="flex-1 space-y-3">
        <h2 className="text-2xl font-semibold transition-colors md:text-3xl">
          О пользователе
        </h2>
        <UserProfileSmall {...resume.user} />
      </div>
    </div>
  )
}
