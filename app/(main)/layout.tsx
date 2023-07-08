import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { SiteHeader } from "@/components/header/site-header"

import { authOptions } from "../api/auth/[...nextauth]/route"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  // Protect routes
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 pb-5 pt-5">{children}</div>
    </div>
  )
}

export default MainLayout
