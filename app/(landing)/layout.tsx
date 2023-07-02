import LandingHeader from "./components/landing-header"

interface LandingLayoutProps {
  children: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <LandingHeader />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default LandingLayout
