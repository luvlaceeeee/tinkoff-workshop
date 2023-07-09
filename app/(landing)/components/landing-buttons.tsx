import Link from "next/link"
import { getServerSession } from "next-auth"

import { authOptions } from "@/config/authOptions"
import { Button } from "@/components/ui/button"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const LandingButtons = async () => {
  const session = await getServerSession(authOptions)
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
