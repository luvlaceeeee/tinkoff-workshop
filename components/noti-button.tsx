"use client"

import Link from "next/link"
import { Bell } from "lucide-react"

import { Button } from "./ui/button"

export function NotificationButton() {
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
