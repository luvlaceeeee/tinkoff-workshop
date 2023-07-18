import { useEffect, useState } from "react"

import { generateKey } from "@/lib/generateKey"
import { statusMap } from "@/lib/statusMap"
import { useProjectStatuses } from "@/hooks/useProjectStatuses"
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

import { useRouting } from "../../hooks/useRouting"

export function ProjectStatusSelect() {
  const { data: statuses = [], isLoading: isStatusesLoading } =
    useProjectStatuses()

  const [router, pathname, searchParams] = useRouting()

  const [open, setOpen] = useState(false)

  const [status, setStatus] = useState("")

  useEffect(() => {
    setStatus(searchParams.get("status") ?? "")
  }, [searchParams])

  const handleOnValueChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set("status", value)
    current.delete("page")
    router.push(pathname + `?${current.toString()}`)
  }

  const handleClearStatus = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.delete("page")
    current.delete("status")
    router.push(pathname + `?${current.toString()}`)
    setOpen(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Label className="shrink-0">Статус проекта: </Label>
      <Select
        open={open}
        onOpenChange={() => {
          setOpen(!open)
        }}
        onValueChange={handleOnValueChange}
        value={status}
      >
        <SelectTrigger className="w-full rounded-2xl">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          {isStatusesLoading ? (
            <Icons.loader className="mx-auto h-7 w-7 fill-main" />
          ) : (
            <>
              {statuses.map((status) => (
                <SelectItem
                  key={generateKey(status.statusName)}
                  className="rounded-xl"
                  value={status.statusName}
                >
                  {statusMap(status.description)}
                </SelectItem>
              ))}
              <Button
                variant={"ghost"}
                size={"sm"}
                className="w-full rounded-xl text-destructive"
                onClick={handleClearStatus}
              >
                Сбросить статус
              </Button>
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
