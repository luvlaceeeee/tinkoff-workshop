import { LandingButtons } from "./components/landing-buttons"
import { LandingStats } from "./components/landing-stats"
import { LandingTypography } from "./components/landing-typography"

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center gap-8 py-20">
      <section className="flex w-full justify-between">
        <div className="space-y-6">
          <LandingTypography />
          <LandingButtons />
        </div>
      </section>
      <LandingStats />
    </div>
  )
}
