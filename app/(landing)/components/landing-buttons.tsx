import Link from "next/link"
import { getServerSession } from "next-auth"

import { authOptions } from "@/config/authOptions"
import { Button } from "@/components/ui/button"

export const LandingButtons = async () => {
  const session = await getServerSession(authOptions)
  const redirectLink = !session ? "/login" : "/main"

  return (
    <div className="space-x-4">
      <Link href={redirectLink}>
        <Button variant="main" className="relative">
          <span className="relative before:absolute before:-inset-0 before:bg-main before:blur-2xl ">
            <span className="relative">Начать работу</span>
          </span>
        </Button>
      </Link>
      {/* <Button variant="outline" className="relative">
        Узнать больше
      </Button> */}
    </div>
  )
}
