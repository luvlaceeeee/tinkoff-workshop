"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

import { ThemeToggle } from "../theme-toggle"
import { Button } from "../ui/button"
import { UserAvatarDropdown } from "../user-avatar-dropdown"

export function RightPartHeader() {
  const { data } = useSession()

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
          {/* TODO Add Notifications */}
          {/* <Button variant="secondary" size="icon" asChild>
            <Link href="/notifications">
              <Bell />
            </Link>
          </Button> */}
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
      <ThemeToggle />
    </nav>
  )
}
