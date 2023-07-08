import Link from "next/link"
import { getServerSession } from "next-auth"

import { Button } from "@/components/ui/button"

export const LandingButtons = () => {
  const session = getServerSession()
  const redirectLink = !session ? "/searchTeam" : "/login"

  return (
    <div className="space-x-4">
      <Button variant="main" className="relative">
        <Link href={redirectLink}>
          <span className="relative before:absolute before:-inset-0 before:bg-main before:blur-2xl ">
            <span className="relative">Найти команду</span>
          </span>
        </Link>
      </Button>
      <Button variant="outline" className="relative">
        Узнать больше
      </Button>
    </div>
  )
}
