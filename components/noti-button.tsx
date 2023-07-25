"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useUserStore } from "@/store/userStore"
import { Bell } from "lucide-react"
import useWebSocket from "react-use-websocket"
import { JsonValue } from "react-use-websocket/dist/lib/types"

import { convertDate } from "@/lib/convertDate"
import { cn } from "@/lib/utils"

import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

type Notification = JsonValue & {
  createdWhen: EpochTimeStamp
  id: number
  projectTitle: string
  projectId: number
  resumeId: number
  vacancyId: number
  type: {
    description: string
    typeName: string
  }
}

export function NotificationButton() {
  const email = useUserStore((state) => state.user.email)
  const [loading, setLoading] = useState(true)
  const [noti, setNoti] = useState<Notification[]>([])
  const [open, setOpen] = useState<boolean>(false)

  const { lastJsonMessage, sendMessage } = useWebSocket<Notification[]>(
    `ws://localhost:8080/ws/notifications/${email}`,
    {
      share: true,
      onOpen: () => {
        setLoading(false)
      },
    }
  )

  useEffect(() => {
    setNoti(lastJsonMessage)
  }, [lastJsonMessage])

  const handleDeleteNoti = (notiId: number) => {
    sendMessage(`${notiId}`)
    setNoti((prev) => prev.filter((noti) => noti.id !== notiId))
    setOpen(false)
  }

  return loading ? (
    <Button variant="secondary" size="icon">
      <Bell className="h-5 w-5" />
    </Button>
  ) : (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div className="relative">
          <Button variant="secondary" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          {noti && (
            <div
              className={`${
                !noti.length && "hidden"
              } absolute -right-1 -top-1 rounded-xl bg-destructive p-1.5 py-0 text-sm`}
            >
              {noti.length}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-full max-w-sm rounded-2xl p-0 md:max-w-xl"
      >
        <ul className="scrollbar max-h-56 overflow-auto">
          {noti && noti.length ? (
            noti?.map((noti, i) => (
              //@ts-ignore
              <Notification
                {...noti}
                className={i === 0 ? "border-t-0" : ""}
                handleDelete={handleDeleteNoti}
              />
            ))
          ) : (
            <p className="p-4 text-center text-xs text-muted-foreground">
              У вас нету уведомлений
            </p>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

const Notification = (
  props: Notification & {
    className?: string
    handleDelete: (notiId: number) => void
  }
) => {
  const {
    createdWhen,
    type,
    id,
    resumeId,
    projectTitle,
    className,
    projectId,
    vacancyId,
    handleDelete,
  } = props
  return (
    <li
      className={cn(
        "flex max-w-xs items-center justify-between gap-3 border-t p-3 text-sm md:w-full md:max-w-full ",
        className
      )}
    >
      <div className="flex items-center justify-start gap-3 before:block before:h-2 before:w-2 before:shrink-0 before:rounded-full before:bg-accept">
        <div className="flex flex-col items-start">
          <p className="font-semibold">{projectTitle}</p>
          <p className="text-xs">{type.description}</p>
          <p className="text-xs text-muted-foreground">
            {convertDate(createdWhen)}
          </p>
        </div>
      </div>

      <Link
        href={
          resumeId
            ? `/resumes/${resumeId}/requests`
            : `/project/${projectId}/vacancies/${vacancyId}/requests`
        }
      >
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => handleDelete(id)}
        >
          Смотреть заявки
        </Button>
      </Link>
    </li>
  )
}
