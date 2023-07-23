"use client"

import { DirectionSelect } from "../../components/direction-select"
import { SkillsMultiSelect } from "../../components/skills-multi-select-search"
import { SortSelect } from "../../components/sort-select"

export function SearchResumesHeader() {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
      <div className="hidden shrink-0 gap-5 md:flex">
        <SortSelect />
        <DirectionSelect />
      </div>
      {/* mobile */}
      <div className="flex flex-col items-start justify-start gap-2 md:hidden">
        <SortSelect />
        <DirectionSelect />
      </div>

      <div>
        <SkillsMultiSelect />
      </div>
    </div>
  )
}
