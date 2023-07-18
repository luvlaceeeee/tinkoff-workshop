"use client"

import { IVacancy } from "@/types/interfaces/IVacancy"
import { ProjectProfileSmall } from "@/components/project-profile-sm"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"

import { useVacancyById } from "../hooks/useVacancyById"

export default function VacancyPage({ params }: { params: { id: string } }) {
  const { data: vacancy = {} as IVacancy } = useVacancyById(+params.id)

  return (
    <div className="flex justify-between gap-10">
      <div className="flex flex-1 flex-col gap-5 border-r pr-3">
        <SkillsSection skills={vacancy.skills} titleSize="text-3xl" />
        <AboutSection
          title="Опыт разработки"
          description={vacancy.description}
          titleSize="text-3xl"
        />
      </div>
      <div className="flex-1 space-y-3">
        {/* <h2 className="text-3xl font-semibold transition-colors">О проекте</h2> */}
        <ProjectProfileSmall {...vacancy.project} />
      </div>
    </div>
  )
}
