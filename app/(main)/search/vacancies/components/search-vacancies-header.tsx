"use client"

import { DirectionSelect } from "../../components/direction-select"
import { SkillsMultiSelect } from "../../components/skills-multi-select-search"
import { SortSelect } from "../../components/sort-select"
import { ProjectStatusSelect } from "./project-status-select"

export function SearchVacanciesHeader() {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
      <div className="hidden shrink-0 gap-5 md:flex">
        <SortSelect />
        <DirectionSelect />
        <ProjectStatusSelect />
      </div>

      <div className="flex flex-col items-start justify-start gap-2 md:hidden">
        <SortSelect />
        <DirectionSelect />
        <ProjectStatusSelect />
      </div>

      <div>
        <SkillsMultiSelect />
      </div>
    </div>
  )
}
