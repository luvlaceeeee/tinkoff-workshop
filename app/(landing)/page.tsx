import { LandingButtons } from "./components/landing-buttons"
import { LandingTypography } from "./components/landing-typography"

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center gap-8">
      <section className="container flex h-[calc(100vh-6rem)] w-full items-center animate-in fade-in duration-700">
        <div className="space-y-6">
          <LandingTypography />
          <LandingButtons />
        </div>
      </section>
      {/* <LandingStats /> */}
    </div>
  )
}
