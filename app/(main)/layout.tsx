import { SiteHeader } from "@/components/header/site-header"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 pb-5 pt-5">{children}</div>
    </div>
  )
}

export default MainLayout
