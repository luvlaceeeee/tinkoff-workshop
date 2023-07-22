import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/config/authOptions"
import { RightPartHeader } from "@/components/header/right-part-header"
import { SiteHeader } from "@/components/header/site-header"

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
    <div className="scrollbar relative flex min-h-screen flex-col overflow-visible">
      <SiteHeader>
        {/* @ts-expect-error Server Component */}
        <RightPartHeader />
      </SiteHeader>
      <div className="container flex-1 pb-5 pt-5">{children}</div>
    </div>
  )
}

export default MainLayout
