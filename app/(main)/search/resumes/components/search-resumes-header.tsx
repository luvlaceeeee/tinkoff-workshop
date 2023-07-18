"use client"

import { DirectionSelect } from "../../components/direction-select"
import { SortSelect } from "../../components/sort-select"
import { SkillsSelect } from "./skills-select"

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
