"use client"

import Link from "next/link"
import { Bell } from "lucide-react"
import { useSession } from "next-auth/react"
import useWebSocket from "react-use-websocket"

import { Button } from "./ui/button"

export function NotificationButton() {
  const { data } = useSession()
  useWebSocket("ws://localhost:8080/ws/notifications", {
    queryParams: { bearer: data?.user.username! },
    onOpen: () => {
      console.log("WebSocket connection established.")
    },
  })

  return (
    <div className="relative">
      <Link href="/notifications">
        <Button variant="secondary" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </Link>
      <div className="absolute -right-1 -top-1 rounded-xl bg-destructive p-1.5 py-0 text-sm">
        0
      </div>
    </div>
  )
}
