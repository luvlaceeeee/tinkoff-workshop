"use client"

import { ReactNode, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlignJustify, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

import { MobileHeader } from "../../../components/header/mobile-header"

export const LandingHeader = ({ children }: { children: ReactNode }) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    setShowMobileMenu(false)
    console.log(pathname)
  }, [pathname])

  return (
    <>
      <header className="sticky top-0 z-40 hidden w-full bg-background/70 backdrop-blur-lg md:flex ">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex gap-6">
            <Link href="/">
              <Icons.logo />
            </Link>
            {/* <nav className="flex gap-2">
              {landingConfig.navButton.map((item, index) => (
                <Button
                  asChild
                  variant={"text"}
                  key={generateKey("head-btn")}
                  className="text-base font-semibold"
                >
                  <Link href={item.href}>{item.title}</Link>
                </Button>
              ))}
            </nav> */}
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
