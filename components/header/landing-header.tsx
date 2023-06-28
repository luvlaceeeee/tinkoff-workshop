import Link from "next/link"

import { Button } from "@/components/ui/button"

import { landingConfig } from "../../app/(landing)/config/landing"
import Logo from "../logo"
import RightPartHeader from "./right-part-header"

const LandingHeader = () => {
  return (
    <header className="container sticky top-0 z-40 w-full bg-background/70 backdrop-blur-lg">
      <div className="flex h-20 items-center justify-between">
        <div className="flex gap-6">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="flex gap-2">
            {landingConfig.navButton.map((item, index) => (
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

export default LandingHeader
