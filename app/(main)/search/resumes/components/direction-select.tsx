import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"
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

type Direction = { directionName: string; description: string }

export function DirectionSelect() {
  const {
    data: directions = [],
    isLoading: isDirectionLoading,
    refetch,
  } = useQuery<Direction[]>(["directions"], () =>
    $api.get<Direction[]>("dictionaries/directions").then((res) => res.data)
  )

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
      <Label>Направление: </Label>
      <Select
        open={open}
        onOpenChange={() => {
          setOpen(!open)
          !directions.length && refetch()
        }}
        onValueChange={handleOnValueChange}
        value={direction}
      >
        <SelectTrigger className="w-full rounded-2xl">
          <SelectValue
            placeholder={
              directions.find((dir) => dir.directionName === direction)
                ?.description
            }
          />
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
