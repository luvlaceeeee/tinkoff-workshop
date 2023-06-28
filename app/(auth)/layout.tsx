import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

interface AuthLayoutProps {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <Button variant={"secondary"} asChild className="absolute left-4 top-4">
        <Link href={"/"}>
          <ArrowLeft />
          Назад
        </Link>
      </Button>
      <div className="container">{children}</div>
    </div>
  )
}

export default AuthLayout
