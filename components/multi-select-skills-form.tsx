"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { SKILLS } from "@/config/skills"
import { skillMap } from "@/lib/skillMap"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"

import { Button } from "./ui/button"

export function MultiSelectSkillsForm({
  append,
  selected,
}: {
  append: (value: { value: string }) => void
  selected: string[]
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Escape") {
          e.stopPropagation()
          input.blur()
        }
      }
    },
    []
  )

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          <CommandPrimitive.Input
            ref={inputRef}
            maxLength={30}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Выберите навык"
            className="ml-2 w-40 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <Button
            variant={"outline"}
            type="button"
            size={"sm"}
            disabled={!inputValue}
            onClick={() => {
              const inputValue = inputRef.current?.value
              if (!inputValue) return

              setInputValue("")
              if (!selected.includes(inputValue.toLocaleLowerCase()))
                append({ value: inputValue.toLowerCase() })
            }}
          >
            Добавить
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
                      if (!selected.includes(skill)) append({ value: skill })
                    }}
                    className={`cursor-pointer `}
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
