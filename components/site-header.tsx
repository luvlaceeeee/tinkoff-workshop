import Link from "next/link"

import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/components/theme-toggle"

import { Button } from "./ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background px-5">
      {/* right part */}
      <div className="flex h-20 items-center justify-between">
        <div className="flex gap-6">
          {/* <Button size={"icon"} variant={"ghost"}>
            <AlignJustify />
          </Button> */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block select-none text-3xl font-semibold">
              Code
              {/* Code<span className="font-extrabold italic">Crew</span> */}
              <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pyellow">
                <span className="relative text-white">Crew</span>
              </span>
            </span>
          </Link>
          <nav className="flex gap-2">
            {siteConfig.navButton.map((item, index) => (
              <Button
                variant={"text"}
                asChild
                className="text-base font-semibold"
              >
                <Link key={index} href={item.href}>
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
        {/* left part */}
        <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant={"secondary"}>Войти</Button>
            <Button variant={"secondary"}>Зарегистрироваться</Button>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
