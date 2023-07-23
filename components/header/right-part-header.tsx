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
            <Link href="/projects">
              <Button variant={"secondary"}>Мои проекты</Button>
            </Link>
            <Link href="/resumes">
              <Button variant={"secondary"}>Мои резюме</Button>
            </Link>
            {/* TODO Add Notifications */}
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
            <UserAvatarDropdown />
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant={"secondary"}>Войти</Button>
            </Link>
            <Link href="/register">
              <Button variant={"secondary"}>Зарегистрироваться</Button>
            </Link>
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
                <Link href="/notifications">
                  <Button variant="secondary" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                </Link>
                <div className="absolute -right-1 -top-1 rounded-xl bg-destructive p-1.5 py-0 text-sm">
                  0
                </div>
              </div>
              <UserAvatarDropdown />
            </div>
            <Link href="/projects" className="w-full">
              <Button variant={"secondary"} className="w-full">
                Мои проекты
              </Button>
            </Link>
            <Link href="/resumes" className="w-full">
              <Button variant={"secondary"} className="w-full">
                Мои резюме
              </Button>
            </Link>

            <Separator />

            <Link href="/main" className="w-full">
              <Button variant={"secondary"} className="w-full">
                Главная
              </Button>
            </Link>

            <p className="w-full text-left text-sm text-muted-foreground">
              Найти
            </p>
            <Link href="/search/vacancies" className="w-full">
              <Button variant={"secondary"} className="w-full">
                Проект
              </Button>
            </Link>
            <Link href="/search/resumes" className="w-full">
              <Button variant={"secondary"} className="w-full">
                Разработчика
              </Button>
            </Link>

            <p className="w-full text-left text-sm text-muted-foreground">
              Создать
            </p>
            <Link href="/projects/choose" className="w-full">
              <Button variant={"secondary"} className="w-full">
                Вакансию
              </Button>
            </Link>
            <Link href="/create/resume" className="w-full">
              <Button variant={"secondary"} className="w-full">
                Резюме
              </Button>
            </Link>
            <Link href="/create/project" className="w-full">
              <Button variant={"secondary"} className="w-full">
                Проект
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="w-full">
              <Button variant={"ghost"} className="w-full">
                Войти
              </Button>
            </Link>
            <Link href="/register" className="w-full">
              <Button variant={"ghost"} className="w-full">
                Зарегистрироваться
              </Button>
            </Link>
          </>
        )}
      </nav>
    </>
  )
}
