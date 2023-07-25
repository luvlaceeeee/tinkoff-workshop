import Link from "next/link"
import { getServerSession } from "next-auth"

import { authOptions } from "@/config/authOptions"

import { NotificationButton } from "../noti-button"
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
            <NotificationButton />
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
              <div className="flex gap-2">
                <ThemeToggle />
              </div>

              <UserAvatarDropdown />
            </div>
            <Link href="/projects" className="w-full">
              <Button
                variant={"outline"}
                className="w-full flex-col items-start p-6"
              >
                <p className="text-sm font-semibold">Мои проекты</p>
                <p className="text-muted-foreground">Список ваших проектов</p>
              </Button>
            </Link>
            <Link href="/resumes" className="w-full">
              <Button
                variant={"outline"}
                className="w-full flex-col items-start p-6"
              >
                <p className="text-sm font-semibold">Мои резюме</p>
                <p className="text-muted-foreground">Список ваших резюме</p>
              </Button>
            </Link>

            <Separator />

            <Link href="/main" className="w-full">
              <Button
                variant={"outline"}
                className="w-full flex-col items-start p-6"
              >
                <p className="text-sm font-semibold">Главная</p>
                <p className="text-muted-foreground">
                  Недавние вакансии, резюме
                </p>
              </Button>
            </Link>

            <div className="flex items-center justify-center">
              <Separator />
              <div className="relative text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Найти
                </span>
              </div>
              <Separator />
            </div>

            <Link href="/search/vacancies" className="w-full">
              <Button
                variant={"outline"}
                className="w-full flex-col items-start p-6"
              >
                <p className="text-sm font-semibold">Проект</p>
                <p className="text-muted-foreground">
                  Поиск по активным вакансиям
                </p>
              </Button>
            </Link>
            <Link href="/search/resumes" className="w-full">
              <Button
                variant={"outline"}
                className="w-full flex-col items-start p-6"
              >
                <p className="text-sm font-semibold">Разработчика</p>
                <p className="text-muted-foreground">
                  Поиск по активным резюме
                </p>
              </Button>
            </Link>

            <div className="flex items-center justify-center">
              <Separator />
              <div className="relative text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Создать
                </span>
              </div>
              <Separator />
            </div>
            <Link href="/projects/choose" className="w-full">
              <Button
                variant={"outline"}
                className="w-full flex-col items-start p-6"
              >
                <p className="text-sm font-semibold">Вакансию</p>
              </Button>
            </Link>
            <Link href="/create/resume" className="w-full">
              <Button
                variant={"outline"}
                className="w-full flex-col items-start p-6"
              >
                <p className="text-sm font-semibold">Резюме</p>
              </Button>
            </Link>
            <Link href="/create/project" className="w-full">
              <Button
                variant={"outline"}
                className="w-full flex-col items-start p-6"
              >
                <p className="text-sm font-semibold">Проект</p>
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="w-full">
              <Button variant={"secondary"} className="w-full">
                Войти
              </Button>
            </Link>
            <Link href="/register" className="w-full">
              <Button variant={"secondary"} className="w-full">
                Зарегистрироваться
              </Button>
            </Link>
          </>
        )}
      </nav>
    </>
  )
}
