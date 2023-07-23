"use client"

import { ReactNode, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlignJustify, X } from "lucide-react"

import { Icons } from "../icons"
import { ThemeToggle } from "../theme-toggle"
import { Button } from "../ui/button"
import { HeaderNavigationMenu } from "./header-navigation-menu"
import { MobileHeader } from "./mobile-header"

export function SiteHeader({ children }: { children: ReactNode }) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    setShowMobileMenu(false)
  }, [pathname])

  return (
    <>
      <header className="sticky top-0 z-40 hidden w-full border-b bg-background/70 px-5 backdrop-blur-lg md:block">
        <div className="flex h-20 items-center justify-between">
          <div className="flex gap-6">
            <Link href="/">
              <Icons.logo />
            </Link>
            <HeaderNavigationMenu />
          </div>
          {children}
        </div>
      </header>

      <header className="sticky top-0 z-40 w-full bg-background/70 px-7 backdrop-blur-lg md:hidden">
        <div className="flex h-20 items-center justify-between">
          <div className="flex gap-6">
            <Link href="/">
              <Icons.logo className="w-40" />
            </Link>
          </div>
          <div className="space-x-2">
            <ThemeToggle />
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X /> : <AlignJustify />}
            </Button>
          </div>
        </div>
      </header>
      {showMobileMenu && <MobileHeader>{children}</MobileHeader>}
    </>
  )
}
