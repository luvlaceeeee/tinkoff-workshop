import { getServerSession } from "next-auth"

import { authOptions } from "../api/auth/[...nextauth]/route"
import { LandingButtons } from "./components/landing-buttons"
import { LandingTypography } from "./components/landing-typography"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)
  console.log(session)
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