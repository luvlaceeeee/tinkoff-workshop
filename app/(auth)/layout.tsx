import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/config/authOptions"
import { Button } from "@/components/ui/button"

interface AuthLayoutProps {
  children: React.ReactNode
}

async function AuthLayout({ children }: AuthLayoutProps) {
  // Protect routes
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/main")
  }

  return (
    <div className="relative min-h-screen">
      <Link href={"/"}>
        <Button variant={"secondary"} className="absolute left-4 top-4">
          <ArrowLeft />
          На главную
        </Button>
      </Link>
      <div className="container">{children}</div>
    </div>
  )
}

export default AuthLayout
