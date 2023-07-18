"use client"

import { DirectionSelect } from "../../components/direction-select"
import { SkillsMultiSelect } from "../../components/skills-multi-select-search"
import { SortSelect } from "../../components/sort-select"
import { ProjectStatusSelect } from "./project-status-select"

export function SearchVacanciesHeader() {
  return (
    <div className="flex items-center justify-between gap-10">
      <div className="flex shrink-0 gap-5">
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
