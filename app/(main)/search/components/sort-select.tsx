import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useRouting } from "../hooks/useRouting"

export function SortSelect() {
  const [router, pathname, searchParams] = useRouting()

  const [open, setOpen] = useState(false)

  const [dateSort, setDateSort] = useState<string | null>(null)

  useEffect(() => {
    setDateSort(searchParams.get("dateSort"))
  }, [searchParams])

  const handleOnValueChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.delete("page")
    current.set("dateSort", value)
    router.push(pathname + `?${current.toString()}`)
  }

  const handleClearDateSort = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.delete("page")
    current.delete("dateSort")
    setDateSort(null)
    router.push(pathname + `?${current.toString()}`)
    setOpen(false)
  }

  return (
    <div className="flex items-center gap-6 md:justify-start md:gap-2">
      <Label className="text-xs md:text-sm">Сортировка: </Label>
      <Select
        onValueChange={handleOnValueChange}
        //@ts-ignore
        value={dateSort}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger className="rounded-2xl">
          <SelectValue placeholder="Сортировать по" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          <SelectItem value="ASC" className="rounded-xl">
            Самые старые
          </SelectItem>
          <SelectItem value="DESC" className="rounded-xl">
            Самые новые
          </SelectItem>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="w-full rounded-xl text-destructive"
            onClick={handleClearDateSort}
          >
            Сбросить сортировку
          </Button>
        </SelectContent>
      </Select>
    </div>
  )
}
