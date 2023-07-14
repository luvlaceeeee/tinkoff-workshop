"use client"

import { DirectionSelect } from "./direction-select"
import { SkillsSelect } from "./skills-select"
import { SortSelect } from "./sort-select"

export function SearchResumesHeader() {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex gap-5">
        <SortSelect />
        <DirectionSelect />
      </div>
      <SkillsSelect />
    </div>
  )
}
