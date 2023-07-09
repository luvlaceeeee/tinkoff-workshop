import Link from "next/link"

import { generateKey } from "@/lib/generateKey"
import { Button } from "@/components/ui/button"
import { RightPartHeader } from "@/components/header/right-part-header"
import { Icons } from "@/components/icons"

import { landingConfig } from "../config/landing"

const LandingHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-lg">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex gap-6">
          <Link href="/">
            <Icons.logo />
          </Link>
          <nav className="flex gap-2">
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
          </nav>
        </div>
        {/* @ts-expect-error Server Component */}
        <RightPartHeader />
      </div>
    </header>
  )
}

export default LandingHeader
