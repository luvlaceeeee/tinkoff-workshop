import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getServerSession } from "next-auth"

import { Button } from "@/components/ui/button"

import { authOptions } from "../api/auth/[...nextauth]/route"

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
      <Button variant={"secondary"} asChild className="absolute left-4 top-4">
        <Link href={"/"}>
          <ArrowLeft />
          На главную
        </Link>
      </Button>
      <div className="container">{children}</div>
    </div>
  )
}

export default AuthLayout
