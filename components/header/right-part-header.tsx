"use client"

import Link from "next/link"
import { Bell } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "../ui/button"
import { UserAvatarDropdown } from "../user-avatar-dropdown"

export function RightPartHeader() {
  const { data, status } = useSession()
  return (
    <nav className="flex items-center space-x-3">
      {data?.user ? (
        <>
          <Button variant={"secondary"} asChild>
            <Link href="/projects">Мои проекты</Link>
          </Button>
          <Button variant={"secondary"} asChild>
            <Link href="/resumes">Мои резюме</Link>
          </Button>
          <Button variant="secondary" size="icon" asChild>
            <Link href="/notifications">
              <Bell />
            </Link>
          </Button>
          <UserAvatarDropdown />
        </>
      ) : (
        <>
          <Button variant={"secondary"} asChild>
            <Link href="/login">Войти</Link>
          </Button>
          <Button variant={"secondary"} asChild>
            <Link href="/register">Зарегистрироваться</Link>
          </Button>
        </>
      )}
    </nav>
  )
}
