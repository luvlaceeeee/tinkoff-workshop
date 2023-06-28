"use client"

import Link from "next/link"
import { useAuthStore } from "@/store/authStore"

import { ThemeToggle } from "../theme-toggle"
import { Button } from "../ui/button"
import UserAvatarDropdown from "../user-avatar-dropdown"

export default function RightPartHeader() {
  const { isAuth, user } = useAuthStore((state) => state)
  const { avatar, login, firstName, lastName } = user
  return (
    <div className="flex items-center space-x-4">
      <nav className="flex items-center space-x-2">
        {isAuth ? (
          <UserAvatarDropdown />
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
      <ThemeToggle />
    </div>
  )
}
