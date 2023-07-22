import Link from "next/link"
import { Bell } from "lucide-react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/config/authOptions"

import { ThemeToggle } from "../theme-toggle"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { UserAvatarDropdown } from "../user-avatar-dropdown"

export async function RightPartHeader() {
  const data = await getServerSession(authOptions)

  return (
    <>
      <nav className="hidden items-center space-x-3 md:flex">
        {data?.user ? (
          <>
            <Button variant={"secondary"} asChild>
              <Link href="/projects">Мои проекты</Link>
            </Button>
            <Button variant={"secondary"} asChild>
              <Link href="/resumes">Мои резюме</Link>
            </Button>
            {/* TODO Add Notifications */}
            <div className="relative">
              <Button variant="secondary" size="icon" asChild>
                <Link href="/notifications">
                  <Bell />
                </Link>
              </Button>
              <div className="absolute -right-1 -top-1 rounded-xl bg-destructive p-1.5 py-0 text-sm">
                0
              </div>
            </div>
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
      {/* mobile */}
      <nav className="flex flex-col items-center gap-4 md:hidden">
        {data?.user ? (
          <>
            <div className="flex w-full justify-between">
              <div className="relative">
                <Button variant="secondary" size="icon" asChild>
                  <Link href="/notifications">
                    <Bell />
                  </Link>
                </Button>
                <div className="absolute -right-1 -top-1 rounded-xl bg-destructive p-1.5 py-0 text-sm">
                  0
                </div>
              </div>
              <UserAvatarDropdown />
            </div>
            <Button variant={"secondary"} className="w-full">
              <Link href="/projects">Мои проекты</Link>
            </Button>
            <Button variant={"secondary"} className="w-full">
              <Link href="/resumes">Мои резюме</Link>
            </Button>

            <Separator />

            <Button variant={"secondary"} className="w-full">
              <Link href="/main">Главная</Link>
            </Button>

            <p className="w-full text-left text-sm text-muted-foreground">
              Найти
            </p>
            <Button variant={"secondary"} className="w-full">
              <Link href="/search/vacancies">Проект</Link>
            </Button>
            <Button variant={"secondary"} className="w-full">
              <Link href="/search/resumes">Разработчика</Link>
            </Button>

            <p className="w-full text-left text-sm text-muted-foreground">
              Создать
            </p>
            <Button variant={"secondary"} className="w-full">
              <Link href="/create/resume">Вакансию</Link>
            </Button>
            <Button variant={"secondary"} className="w-full">
              <Link href="/projects/choose">Резюме</Link>
            </Button>
            <Button variant={"secondary"} className="w-full">
              <Link href="/create/project">Проект</Link>
            </Button>
          </>
        ) : (
          <>
            <Button variant={"ghost"} className="w-full">
              <Link href="/login">Войти</Link>
            </Button>
            <Button variant={"ghost"} className="w-full">
              <Link href="/register">Зарегистрироваться</Link>
            </Button>
          </>
        )}
      </nav>
    </>
  )
}
