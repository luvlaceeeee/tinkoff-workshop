"use client"

import Link from "next/link"
import { useAuthStore } from "@/store/authStore"
import { Bell } from "lucide-react"

import { ThemeToggle } from "../theme-toggle"
import { Button } from "../ui/button"
import { UserAvatarDropdown } from "../user-avatar-dropdown"

export function RightPartHeader() {
  const { isAuth } = useAuthStore((state) => state)
  return (
    <nav className="flex items-center space-x-3">
      {isAuth ? (
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
      <ThemeToggle />
    </nav>
  )
}
