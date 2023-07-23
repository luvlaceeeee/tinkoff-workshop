"use client"

import { IVacancy } from "@/types/interfaces/IVacancy"
import { ProjectProfileSmall } from "@/components/project-profile-sm"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"

import { useVacancyById } from "../hooks/useVacancyById"

export default function VacancyPage({ params }: { params: { id: string } }) {
  const { data: vacancy = {} as IVacancy } = useVacancyById(+params.id)

  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:gap-10">
      <div className="flex flex-1 flex-col gap-5 border-b pb-5 md:border-b-0 md:border-r md:pb-0 md:pr-3">
        <SkillsSection
          skills={vacancy.skills}
          titleSize="text-2xl md:text-3xl"
        />
        <AboutSection
          title="Опыт разработки"
          description={vacancy.description}
          titleSize="text-2xl md:text-3xl"
          className="space-y-1"
        />
      </div>
      <div className="flex-1 space-y-3">
        {/* <h2 className="text-3xl font-semibold transition-colors">О проекте</h2> */}
        <ProjectProfileSmall {...vacancy.project} />
      </div>
    </div>
  )
}
