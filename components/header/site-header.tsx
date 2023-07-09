import Link from "next/link"

import { Icons } from "../icons"
import { HeaderNavigationMenu } from "./header-navigation-menu"
import { RightPartHeader } from "./right-part-header"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 px-5 backdrop-blur-lg">
      <div className="flex h-20 items-center justify-between">
        <div className="flex gap-6">
          <Link href="/">
            <Icons.logo />
          </Link>
          <HeaderNavigationMenu />
        </div>
        {/* @ts-expect-error Server Component */}
        <RightPartHeader />
      </div>
    </header>
  )
}
