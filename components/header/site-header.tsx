import Link from "next/link"

import { siteConfig } from "@/config/site"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import RightPartHeader from "./right-part-header"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 px-5 backdrop-blur-lg">
      <div className="flex h-20 items-center justify-between">
        <div className="flex gap-6">
          <Link href="/">
            {/* <Logo /> */}
            <Icons.logo />
          </Link>
          <nav className="flex gap-2">
            {siteConfig.navButton.map((item, index) => (
              <Button
                asChild
                variant={"text"}
                key={index}
                className="text-base font-semibold"
              >
                <Link href={item.href}>{item.title}</Link>
              </Button>
            ))}
          </nav>
        </div>
        <RightPartHeader />
      </div>
    </header>
  )
}
