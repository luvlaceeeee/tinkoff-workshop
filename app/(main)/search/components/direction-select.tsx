import { useEffect, useState } from "react"

import { generateKey } from "@/lib/generateKey"
import { useDirection } from "@/hooks/useDirection"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"

import { useRouting } from "../hooks/useRouting"

export function DirectionSelect() {
  const { data: directions = [], isLoading: isDirectionLoading } =
    useDirection()

  const [router, pathname, searchParams] = useRouting()

  const [open, setOpen] = useState(false)

  const [direction, setDirection] = useState("")

  useEffect(() => {
    setDirection(searchParams.get("direction") ?? "")
  }, [searchParams])

  const handleOnValueChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set("direction", value)
    current.delete("page")
    router.push(pathname + `?${current.toString()}`)
  }

  const handleClearDirection = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.delete("page")
    current.delete("direction")
    router.push(pathname + `?${current.toString()}`)
    setOpen(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Label className="text-xs md:text-sm">Направление: </Label>
      <Select
        open={open}
        onOpenChange={() => {
          setOpen(!open)
        }}
        onValueChange={handleOnValueChange}
        value={direction}
      >
        <SelectTrigger className="w-full rounded-2xl">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          {isDirectionLoading ? (
            <Icons.loader className="mx-auto h-7 w-7 fill-main" />
          ) : (
            <>
              {directions.map((direction) => (
                <SelectItem
                  key={generateKey(direction.directionName)}
                  className="rounded-xl"
                  value={direction.directionName}
                >
                  {direction.description}
                </SelectItem>
              ))}
              <Button
                variant={"ghost"}
                size={"sm"}
                className="w-full rounded-xl text-destructive"
                onClick={handleClearDirection}
              >
                Сбросить направление
              </Button>
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
