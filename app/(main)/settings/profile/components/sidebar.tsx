"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

export function SettingSidebar() {
  const pathname = usePathname()
  return (
    <section className="flex h-full w-full flex-shrink-0 flex-col gap-3 border-b pb-5 md:w-60 md:border-b-0 md:border-r md:pb-0 md:pr-5">
      <Link href={"/settings/profile"}>
        <Button
          variant={"secondary"}
          disabled={pathname === "/settings/profile"}
          className="w-full"
        >
          Настройки профиля
        </Button>
      </Link>
      {/* <Button variant={"secondary"} asChild>
        <Link href={"/settings/appearance"}>Настройки сайта</Link>
      </Button> */}
    </section>
  )
}
