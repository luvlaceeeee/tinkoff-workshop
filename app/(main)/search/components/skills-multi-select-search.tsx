"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { X } from "lucide-react"

import { SKILLS } from "@/config/skills"
import { generateKey } from "@/lib/generateKey"
import { skillMap } from "@/lib/skillMap"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"

import { useRouting } from "../hooks/useRouting"

export function SkillsMultiSelect() {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const [router, pathname, searchParams] = useRouting()

  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [selected, setSelected] = React.useState<string[]>([])

  React.useEffect(() => {
    setSelected(
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
    current.set("skills", [...selected, value].join(","))
    router.push(pathname + `?${current.toString()}`)
  }

  const removeSkillFromURL = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    const filterSkills = selected.filter((skill) => skill !== value)

    if (filterSkills.length) {
      current.set("skills", [...filterSkills].join(","))
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

  const handleUnselect = (skill: string) => {
    removeSkillFromURL(skill)
    setSelected((prev) => prev.filter((s) => s !== skill))
  }

  const handleUnselectAll = () => {
    setInputValue("")
    setSelected([])
    removeAllSkillsFromURL()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev]
            const removeSkill = newSelected.pop()
            console.log("text")
            removeSkillFromURL(removeSkill!)
            return newSelected
          })
        }
      }
      if (e.key === "Escape") {
        input.blur()
      }
    }
  }

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group flex items-center justify-between rounded-2xl border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((skill) => {
            return (
              <Badge key={generateKey(skill)} variant="secondary">
                {skillMap(skill)}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(skill)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(skill)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            maxLength={30}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Выберите навык"
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="shrink-0 space-x-1">
          <Button
            variant={"outline"}
            type="button"
            size={"sm"}
            className="rounded-2xl"
            onClick={() => {
              if (!inputValue) return
              setInputValue("")
              if (!selected.includes(inputValue.toLowerCase())) {
                setSelected((prev) => [...prev, inputValue])
                setSkillsToURL(inputValue)
              }
            }}
          >
            Добавить
          </Button>
          <Button
            variant={"outline"}
            type="button"
            size={"sm"}
            className="rounded-2xl border-destructive/50 hover:bg-destructive/50"
            onClick={() => handleUnselectAll()}
          >
            Очистить
          </Button>
        </div>
      </div>
      <div className="relative mt-2">
        {open ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="scrollbar h-fit max-h-32 overflow-auto">
              {SKILLS.map((skill) => {
                return (
                  <CommandItem
                    key={skill}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onSelect={(value) => {
                      setInputValue("")
                      if (!selected.includes(skill)) {
                        setSelected((prev) => [...prev, skill])
                        setSkillsToURL(skill)
                      }
                    }}
                    className={`cursor-pointer`}
                  >
                    {skillMap(skill)}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  )
}
