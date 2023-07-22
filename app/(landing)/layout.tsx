import { RightPartHeader } from "@/components/header/right-part-header"

import { LandingHeader } from "./components/landing-header"

interface LandingLayoutProps {
  children: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <LandingHeader>
        {/* @ts-expect-error Server Component */}
        <RightPartHeader />
      </LandingHeader>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default LandingLayout
