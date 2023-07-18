import { useEffect, useState } from "react"
import { X } from "lucide-react"

import { SKILLS } from "@/config/skills"
import { generateKey } from "@/lib/generateKey"
import { skillMap } from "@/lib/skillMap"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useRouting } from "../../hooks/useRouting"

export function SkillsSelect() {
  const [inputValue, setInputValue] = useState("")
  const [activeSkills, setActiveSkills] = useState<string[]>([])

  const [router, pathname, searchParams] = useRouting()

  const [skillsSearch, setSkillsSearch] = useState(SKILLS)
  useEffect(() => {
    setSkillsSearch(
      SKILLS.filter((skill) => skill.includes(inputValue.toLowerCase()))
    )
    return () => {
      setSkillsSearch(SKILLS)
    }
  }, [inputValue])

  useEffect(() => {
    setActiveSkills(
      //@ts-ignore
      searchParams.get("skills")
        ? //@ts-ignore
          [...new Set(searchParams.get("skills")?.split(","))]
        : []
    )
  }, [searchParams])

  const setSkillsToURL = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.delete("page")
    current.set("skills", [...activeSkills, value].join(","))
    router.push(pathname + `?${current.toString()}`)
  }

  const removeSkillFromURL = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    const filterSkills = activeSkills.filter(
      (activeSkill) => activeSkill !== value
    )

    if (filterSkills.length) {
      current.set("skills", [...filterSkills].join(" "))
    } else {
      current.delete("skills")
    }

    router.push(pathname + `?${current.toString()}`)
  }

  const removeAllSkillsFromURL = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.delete("skills")
    router.push(pathname + `?${current.toString()}`)
  }

  const handleSetSkill = (value: string) => () => {
    const isActive = activeSkills.includes(value.toLowerCase())
    setInputValue("")
    if (!isActive) {
      setActiveSkills((old) => [...old, value.toLowerCase()])
      setSkillsToURL(value)
    }
  }

  const handleRemoveSkill = (value: string) => () => {
    setActiveSkills((old) => old.filter((skill) => skill !== value))
    removeSkillFromURL(value)
  }

  const handleRemoveAllSkills = () => {
    setActiveSkills([])
    removeAllSkillsFromURL()
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex max-w-sm flex-wrap gap-1">
        {activeSkills.map((skill) => (
          <Badge
            key={generateKey("skill-badge")}
            className="flex items-center gap-1"
          >
            {skillMap(skill)}
            <button onClick={handleRemoveSkill(skill)}>
              <X className="w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <Popover open={!!inputValue && !!skillsSearch.length}>
        <PopoverTrigger>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Введите название навыка"
            className="rounded-2xl"
          />
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="p-0"
        >
          <ul>
            {skillsSearch.slice(0, 5).map((skill) => (
              <li key={generateKey("skill-li")}>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="w-full justify-start rounded-none"
                  onClick={handleSetSkill(skill)}
                >
                  {skillMap(skill)}
                </Button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>

      <Button
        type="button"
        variant="outline"
        className="shrink-0"
        disabled={!inputValue}
        onClick={handleSetSkill(inputValue)}
      >
        Добавить
      </Button>
      <Button
        type="button"
        variant="outline"
        className="shrink-0 border-destructive"
        disabled={!activeSkills.length}
        onClick={handleRemoveAllSkills}
      >
        Сбросить навыки
      </Button>
    </div>
  )
}
