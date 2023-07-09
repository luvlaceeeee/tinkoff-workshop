import Link from "next/link"
import { getServerSession } from "next-auth"

import { authOptions } from "@/config/authOptions"

import { ThemeToggle } from "../theme-toggle"
import { Button } from "../ui/button"
import { UserAvatarDropdown } from "../user-avatar-dropdown"

export async function RightPartHeader() {
  const data = await getServerSession(authOptions)

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
